import { House } from "./house";
import { Restaurant } from "./types";

export class DataService {

    static houses = [
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
        new House(Number.POSITIVE_INFINITY)
    ];

    static restaurants: Restaurant[] = [
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

    private constructor() { }

    static getHouses() {
        return this.houses;
    }
    static getRestaurants() {
        return this.restaurants;
    }
    static getRestaurantById(id: number) {
        return this.restaurants.find(x => x.id === id);
    }
}