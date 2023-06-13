import { defineStore } from "pinia"
import { House } from "~/types/house";
import { Employee, Player, Product, Milestone } from "~/types/player";

export interface Restaurant {
    id: number;
    name: string;
    img: string;
    color: string;
    class: string;
}

export interface RestaurantTaken extends Restaurant {
    disabled: boolean;
}
export interface DinnerTime {
    players: Player[];
    actions: DinnerTimeAction[];
    sum: number;
}
export interface DinnerTimeAction {
    playerUpdated: Player | null,
    earns: number,
    house: House,
    kimchi: boolean,
    sushi: boolean,
    noodle: boolean
}

const initialHouses = [
    new House(1, true),
    new House(2),
    new House(3, true),
    new House(3.14),
    new House(4),
    new House(5),
    new House(6, true),
    new House(7),
    new House(8),
    new House(9, true),
    new House(9.75),
    new House(10),
    new House(11, true),
    new House(12),
    new House(13),
    new House(14, true),
    new House(15),
    new House(16),
    new House(17, true),
    new House(18),
    new House(19, true),
    new House(20),
    new House(21),
    new House(22),
    new House(23),
    new House(24),
    new House(25, true),
    new House(Number.NaN)
];

export const useMainStore = defineStore('main', () => {

    const restaurantsDef: Restaurant[] = [
        {
            id: 1,
            name: 'Duck Dinner',
            img: '/img/p_duck_dinner.jpg',
            color: 'text-info',
            class: 'info'
        },
        {
            id: 2,
            name: 'Gluttony Inc',
            img: '/img/p_gluttony_inc.jpg',
            color: 'text-red-600',
            class: 'red'
        },
        {
            id: 3,
            name: 'Fried Geese',
            img: '/img/p_fried_geese.jpg',
            color: 'text-secondary',
            class: 'secondary'
        },
        {
            id: 4,
            name: 'Santa Maria',
            img: '/img/p_santa_maria.jpg',
            color: 'text-error',
            class: 'error'
        },
        {
            id: 5,
            name: 'Xango Blues',
            img: '/img/p_xango_blues.jpg',
            color: 'text-lime-600',
            class: 'lime'
        },
        {
            id: 6,
            name: 'Siap Faji',
            img: '/img/p_siap_faji.jpg',
            color: 'text-accent',
            class: 'accent'
        }
    ];
    const players: Ref<Player[]> = ref([]);
    const houses: Ref<House[]> = ref(initialHouses);

    function test() {
        $reset();
        let player1 = newPlayer({ name: 'Kiny', restaurant_id: 1 });
        player1?.setFoodAndDrinkAndDrink(Product.BURGER, 10);
        let player2 = newPlayer({ name: 'Flo', restaurant_id: 2 });
        player2?.setFoodAndDrinkAndDrink(Product.PIZZA, 10);
        houses.value[0].setPark();
        houses.value[0].setNeed(Product.BURGER, 1);
        houses.value[0].setNeed(Product.PIZZA, 1);
        houses.value[0].setNeed(Product.BEER, 1);
        houses.value[0].setNeed(Product.COKE, 1);
        houses.value[0].setNeed(Product.JUICE, 1);
        houses.value[1].setGarden();
        houses.value[1].setPark();
        houses.value[1].setNeed(Product.BURGER, 1);
        houses.value[3].setPark();
        houses.value[3].setNeed(Product.BEER, 5);
        houses.value[houses.value.length - 1].setNeed(Product.JUICE, 5);
        player1?.setDistanceTo(1, 1);
        player2?.setDistanceTo(1, 1);
    }
    function $reset() {
        players.value = [];
        houses.value = initialHouses;
    }
    function newPlayer({ name, restaurant_id }: { name: string, restaurant_id: number }): Player | undefined {
        const nameTaken = players.value.some(p => p.name === name);
        if (nameTaken) return;
        const restaurantExists = restaurantsDef.some(r => r.id === restaurant_id);
        if (!restaurantExists) return;
        const restaurantTaken = players.value.some(p => p.restaurant.id === restaurant_id);
        if (restaurantTaken) return;
        const player = new Player(name, restaurant_id);
        players.value.push(player);
        return player;
    }
    function deletePlayer(name: string) {
        const player = players.value.find(p => p.name === name);
        if (!player) return;
        players.value.splice(players.value.indexOf(player), 1);
    }
    function setTurnOrder(playersSorted: Player[]) {
        playersSorted.forEach((player, index) => {
            players.value.find(p => p.name === player.name)!.turnOrder = index + 1;
        })
    }
    function housesWithNeeds() {
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
        let playerAtDistance = players.filter(p => p.getDistanceTo(house.id));
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
    function applyDinnertime(dinnertime: DinnerTime) {
        dinnertime.players.forEach(player => {
            const playerToUpdate = players.value.find(p => p.name === p.name);
            if (playerToUpdate) {
                for (const [product, value] of player.foodsAndDrinks) {
                    playerToUpdate.setFoodAndDrinkAndDrink(product, value);
                }
            }
        });
        dinnertime.actions.forEach(action => {
            if (action.playerUpdated) {
                action.house.resetNeeds();
            }
        });
    }
    function execDinnertime() {
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
            if (player.getEmployee(Employee.CFO)) {
                player.turnAmount += Math.ceil(player.turnAmount * 0.5);
            }
        }
        dinnertime.sum = dinnertime.players.reduce((acc, curr) => acc + curr.turnAmount, 0);
    }
    const restaurants = computed(() => {
        return restaurantsDef.map(r => {
            return {
                ...r,
                disabled: players.value.some(p => p.restaurant.id === r.id)
            } as RestaurantTaken;
        });
    });
    const playersCopy = () => players.value.map(p => p.clone());

    return {
        test,
        $reset,
        restaurants,
        getRestaurant: (id: number) => restaurantsDef.find(r => r.id === id),
        players,
        playersCopy,
        newPlayer,
        deletePlayer,
        setTurnOrder,
        houses,
        housesWithNeeded: computed(housesWithNeeds),
    }
},
    {
        persist: {
            // storage: sessionStorage,
            // afterRestore: (ctx) => {
            //     console.log(`about to restore '${JSON.stringify(ctx.store.players)}'`)
            //     for (let index = 0; index < ctx.store.players.length; index++) {
            //         const player = ctx.store.players[index];
            //         console.log(`about to restore '${JSON.stringify(player)}'`)
            //     }
            // }
        }
    },)