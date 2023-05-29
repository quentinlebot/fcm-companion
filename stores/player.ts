import { defineStore } from "pinia"
import { Player } from "~/types/player";

export interface Restaurant {
    id: number;
    name: string;
    img: string;
}

export interface RestaurantTaken extends Restaurant {
    disabled: boolean;
}


export const usePlayerStore = defineStore('player', () => {

    const restaurantsDef: Restaurant[] = [
        {
            id: 1,
            name: 'Duck Dinner',
            img: '/img/p_duck_dinner.jpg',
        },
        {
            id: 2,
            name: 'Gluttony Inc',
            img: '/img/p_gluttony_inc.jpg',
        },
        {
            id: 3,
            name: 'Fried Geese',
            img: '/img/p_fried_geese.jpg',
        },
        {
            id: 4,
            name: 'Santa Maria',
            img: '/img/p_santa_maria.jpg',
        },
        {
            id: 5,
            name: 'Xango Blues',
            img: '/img/p_xango_blues.jpg',
        },
        {
            id: 6,
            name: 'Siap Faji',
            img: '/img/p_siap_faji.jpg',
        }
    ];
    const players: Ref<Player[]> = ref([]);

    function $reset() {
        players.value = [];
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
        setTurnOrder
    }
},
    {
        persist: true,
    })