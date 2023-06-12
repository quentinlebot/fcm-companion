import { defineStore } from "pinia"
import { House } from "~/types/house";
import { Employee, Player, Product } from "~/types/player";

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

    function $reset() {
        players.value = [];
        houses.value = initialHouses;
    }
    function newPlayer({ name, restaurant_id }: { name: string, restaurant_id: number }) {
        const nameTaken = players.value.some(p => p.name === name);
        if (nameTaken) return;
        const restaurantExists = restaurantsDef.some(r => r.id === restaurant_id);
        if (!restaurantExists) return;
        const restaurantTaken = players.value.some(p => p.restaurant.id === restaurant_id);
        if (restaurantTaken) return;
        players.value.push(new Player(name, restaurant_id));
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
    const restaurants = computed(() => {
        return restaurantsDef.map(r => {
            return {
                ...r,
                disabled: players.value.some(p => p.restaurant.id === r.id)
            } as RestaurantTaken;
        });
    });

    return {
        $reset,
        restaurants,
        getRestaurant: (id: number) => restaurantsDef.find(r => r.id === id),
        players,
        newPlayer,
        deletePlayer,
        setTurnOrder,
        houses,
        housesWithNeeded: computed(housesWithNeeds),
    }
},
    {
        persist: true,
    })