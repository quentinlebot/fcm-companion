import { defineStore } from "pinia"
import { House } from "~/types/house";
import { Player } from "~/types/player";
import { Product, Employee, Milestone, DinnerTime, DinnerTimeAction, RestaurantTaken } from "~/types/types";
import { DataService } from "~/types/data.service";

export const useMainStore = defineStore('main', () => {
    const players: Ref<Player[]> = ref([]);
    const houses: Ref<House[]> = ref(DataService.getHouses());
    const restaurants = computed(() => {
        return DataService.getRestaurants().map(r => {
            return {
                ...r,
                disabled: players.value.some(p => p.restaurant.id === r.id)
            } as RestaurantTaken;
        });
    });
    function test() {
        $reset();
        let player1 = newPlayer({ name: 'Kiny', restaurant_id: 1 });
        let player2 = newPlayer({ name: 'Flo', restaurant_id: 2 });
        let player3 = newPlayer({ name: 'Josh', restaurant_id: 3 });
        let player4 = newPlayer({ name: 'Alex', restaurant_id: 4 });
        let player5 = newPlayer({ name: 'Techa', restaurant_id: 5 });
        let player6 = newPlayer({ name: 'Pépé', restaurant_id: 6 });
    }
    function $reset(): void {
        players.value = [];
        houses.value = DataService.getHouses();
    }
    function newPlayer({ name, restaurant_id }: { name: string, restaurant_id: number }): Player | undefined {
        const nameTaken = players.value.some(p => p.name === name);
        if (nameTaken) return;
        const restaurantExists = restaurants.value.some(r => r.id === restaurant_id);
        if (!restaurantExists) return;
        const restaurantTaken = players.value.some(p => p.restaurant.id === restaurant_id);
        if (restaurantTaken) return;
        const player = new Player(name, restaurant_id);
        players.value.push(player);
        return player;
    }
    function deletePlayer(name: string): void {
        const player = players.value.find(p => p.name === name);
        if (!player) return;
        players.value.splice(players.value.indexOf(player), 1);
    }
    function setTurnOrder(playersSorted: Player[]): void {
        playersSorted.forEach((player, index) => {
            players.value.find(p => p.name === player.name)!.turnOrder = index + 1;
        })
    }
    function getHouse(id: number): House | undefined {
        return houses.value.find(h => h.id === id);
    }
    function housesWithNeeds(): House[] {
        return houses.value.filter(h => h.getNbrOfNeeds() > 0).sort(House.sortById);
    }
    function getPlayersCopy() {
        return players.value.map(p => p.clone());
    }
    function resolveHouseNeeds(players: Player[], house: House): DinnerTimeAction {
        let result: DinnerTimeAction = {
            playerUpdated: null,
            earns: 0,
            house,
            kimchi: false,
            sushi: false,
            noodle: false
        };
        let playerAtDistance = players.filter(p => !isNaN(p.getDistanceTo(house.id)!));
        playerAtDistance = playerAtDistance.sort((a, b) => Player.sortByRules(a, b, house.id));
        const playersWithKimchiAndSushi = playerAtDistance.filter(p => p.hasKimchi() && p.hasSushiNeeds(house));
        if (playersWithKimchiAndSushi.length > 0) {
            result.kimchi = result.sushi = true;
            result.playerUpdated = playersWithKimchiAndSushi[0];
        }
        if (!result.playerUpdated) {
            const playersWithKimchiAndNeeds = playerAtDistance.filter(p => p.hasKimchi() && p.hasHouseNeeds(house));
            if (playersWithKimchiAndNeeds.length > 0) {
                result.kimchi = true;
                result.playerUpdated = playersWithKimchiAndNeeds[0];
            }
        }
        if (!result.playerUpdated) {
            const playersWithKimchiAndNoodle = playerAtDistance.filter(p => p.hasKimchi() && p.hasNoodleNeeds(house));
            if (playersWithKimchiAndNoodle.length > 0) {
                result.kimchi = result.noodle = true;
                result.playerUpdated = playersWithKimchiAndNoodle[0];
            }
        }
        if (!result.playerUpdated) {
            const playersWithSushi = playerAtDistance.filter(p => p.hasSushiNeeds(house));
            if (playersWithSushi.length > 0) {
                result.sushi = true;
                result.playerUpdated = playersWithSushi[0];
            }
        }
        if (!result.playerUpdated) {
            const playersWithNeeds = playerAtDistance.filter(p => p.hasHouseNeeds(house));
            if (playersWithNeeds.length > 0) {
                result.playerUpdated = playersWithNeeds[0];
            }
        }
        if (!result.playerUpdated) {
            const playersWithNoodle = playerAtDistance.filter(p => p.hasNoodleNeeds(house));
            if (playersWithNoodle.length > 0) {
                result.noodle = true;
                result.playerUpdated = playersWithNoodle[0];
            }
        }
        if (result.playerUpdated) {
            if (result.kimchi) {
                result.playerUpdated.increaseFoodAndDrink(Product.KIMCHI, -1);
                result.earns += result.playerUpdated.getFinalUnitPrice(Product.KIMCHI, house.getMultiplier());
            }
            if (result.sushi) {
                result.playerUpdated.increaseFoodAndDrink(Product.SUSHI, -house.getNbrOfNeeds());
                result.earns += house.getNbrOfNeeds() * result.playerUpdated.getFinalUnitPrice(Product.SUSHI, house.getMultiplier());
            } else if (result.noodle) {
                result.playerUpdated.increaseFoodAndDrink(Product.NOODLE, -house.getNbrOfNeeds());
                result.earns += house.getNbrOfNeeds() * result.playerUpdated.getFinalUnitPrice(Product.NOODLE, house.getMultiplier());
            } else {
                for (const [product, need] of house.needs) {
                    result.earns += need * result.playerUpdated.getFinalUnitPrice(product, house.getMultiplier());
                    result.playerUpdated.increaseFoodAndDrink(product, -need);
                }
            }
            // FRY
            result.earns += result.playerUpdated.getEmployee(Employee.FRY_CHEF)! * 10;
            result.playerUpdated.turnAmount += result.earns;
        }
        return result;
    }
    function applyDinnertime(dinnertime: DinnerTime): void {
        dinnertime.actions.filter(elem => elem.playerUpdated).forEach(action => {
            action.house.resetNeeds();
        });
        players.value.forEach(player => {
            player.resetEmployees();
            player.resetFoodAndDrink();
        });
    }
    function execDinnertime(): DinnerTime {
        const housesWithNeeded = housesWithNeeds();
        let dinnertime: DinnerTime = {
            players: getPlayersCopy(),
            actions: [],
            sum: 0
        }
        for (let index = 0; index < housesWithNeeded.length; index++) {
            dinnertime.actions.push(resolveHouseNeeds(dinnertime.players, housesWithNeeded[index]));
        }
        for (let index = 0; index < dinnertime.players.length; index++) {
            const player = dinnertime.players[index];
            if (player.getEmployee(Employee.WAITRESS)) {
                player.turnAmount += player.getEmployee(Employee.WAITRESS)! * (player.hasMilestone(Milestone.WAITRESS) ? 5 : 3);
            }
            if (player.getEmployee(Employee.NIGHT_SHIFT)) {
                player.turnAmount += player.getEmployee(Employee.WAITRESS)! * (player.hasMilestone(Milestone.WAITRESS) ? 5 : 3);
            }
            if (player.getEmployee(Employee.CFO)) {
                player.turnAmount += Math.ceil(player.turnAmount * 0.5);
            }
        }
        dinnertime.sum = dinnertime.players.reduce((acc, curr) => acc + curr.turnAmount, 0);
        return dinnertime;
    }

    return {
        test,
        $reset,
        restaurants,
        players,
        newPlayer,
        deletePlayer,
        setTurnOrder,
        houses,
        getHouse,
        housesWithNeeded: computed(housesWithNeeds),
        applyDinnertime,
        execDinnertime,
    }
},
    {
        persist: {
        }
    },)