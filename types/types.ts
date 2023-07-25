import { House } from "./house";
import { Player } from "./player";

export enum Product {
    BURGER = 'burger',
    PIZZA = 'pizza',
    COKE = 'coke',
    BEER = 'beer',
    JUICE = 'juice',
    SUSHI = 'sushi',
    NOODLE = 'noodle',
    KIMCHI = 'kimchi',
}
export enum Milestone {
    BURGER = 'burger',
    PIZZA = 'pizza',
    DRINK = 'drink',
    LOWER_PRICE = 'lowerPrice',
    KETCHUP = 'ketchup',
    WAITRESS = 'waitress',
}
export enum Employee {
    PRICING_MANAGER = 'pricingManager',
    DISCOUNT_MANAGER = 'discountManager',
    LUXURIES_MANAGER = 'luxuriesManager',
    FRY_CHEF = 'fryChef',
    CFO = 'cfo',
    WAITRESS = 'waitress',
    MOVIE_STAR_B = 'movieStarB',
    MOVIE_STAR_C = 'movieStarC',
    MOVIE_STAR_D = 'movieStarD',
    NIGHT_SHIFT = 'nightShiftManager',
}

export function isMovieStar(employee: string): boolean {
    return [Employee.MOVIE_STAR_B, Employee.MOVIE_STAR_C, Employee.MOVIE_STAR_D].includes(employee as Employee);
}

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