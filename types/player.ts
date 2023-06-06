import { Restaurant, useMainStore } from "~/stores/main";

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

export enum Employee {
  DISCOUNT_MANAGER = 'discountManager',
  PRICING_MANAGER = 'pricingManager',
  LUXURIES_MANAGER = 'luxuriesManager',
  WAITRESS = 'waitress',
  CFO = 'cfo',
}

export enum Milestone {
  BURGER = 'burger',
  PIZZA = 'pizza',
  DRINK = 'drink',
  LOWER_PRICE = 'lowerPrice',
}

export class Player {

  name: string = 'Player';
  turnOrder: number = -1;
  milestoneBurger: boolean = false;
  milestonePizza: boolean = false;
  milestoneDrink: boolean = false;
  milestoneLowerPrice: boolean = false;
  discountManager: number = 0;
  pricingManager: number = 0;
  luxuriesManager: number = 0;
  baseUnitPrice: number = 10;
  waitress: number = 0;
  cfo: number = 0;
  nbrOfBurger: number = 0;
  nbrOfPizza: number = 0;
  nbrOfCoke: number = 0;
  nbrOfBeer: number = 0;
  nbrOfJuice: number = 0;
  nbrOfSushi: number = 0;
  nbrOfNoodle: number = 0;
  nbrOfKimchi: number = 0;
  restaurant: Restaurant;
  turnAmount: number = 0;
  distances = new Map<number, number>();

  constructor(name: string, restaurant_id: number) {
    this.name = name;
    this.restaurant = useMainStore().getRestaurant(restaurant_id)!;
  }
  setDistance(house_id: number, distance: number) {
    this.distances.set(house_id, distance);
  }
  getDistance(house_id: number) {
    return this.distances.get(house_id);
  }
  getNbrOfEmployee() {
    return this.waitress + this.cfo + this.discountManager + this.pricingManager + this.luxuriesManager;
  }
  increaseNbrOfEmployee(employee: string) {
    switch (employee) {
      case 'discountManager':
        this.discountManager++;
        break;
      case 'pricingManager':
        this.pricingManager++;
        break;
      case 'luxuriesManager':
        this.luxuriesManager++;
        break;
      case 'waitress':
        this.waitress++;
        break;
      case 'cfo':
        if (this.cfo < 1) {
          this.cfo++;
        }
        break;
      default:
        break;
    }
  }
  resetEmployees() {
    this.waitress = 0;
    this.cfo = 0;
    this.discountManager = 0;
    this.pricingManager = 0;
    this.luxuriesManager = 0;
  }
  getNbrOfProduct() {
    return this.nbrOfBurger + this.nbrOfPizza + this.nbrOfCoke + this.nbrOfBeer + this.nbrOfJuice + this.nbrOfSushi + this.nbrOfNoodle + this.nbrOfKimchi;
  }
  getUnitPrice(multiplier: number = 1) {
    return (this.baseUnitPrice +
      this.discountManager * -3 +
      this.pricingManager * -1 +
      this.luxuriesManager * 10 +
      (this.milestoneLowerPrice ? -1 : 0)) * multiplier;
  }
  getBurgerSellingPrice(multiplier: number = 1) {
    return this.getUnitPrice() * multiplier + (this.milestoneBurger ? 5 : 0);
  }
  getPizzaSellingPrice(multiplier: number = 1) {
    return this.getUnitPrice() * multiplier + (this.milestonePizza ? 5 : 0);
  }
  getDrinkSellingPrice(multiplier: number = 1) {
    return this.getUnitPrice() * multiplier + (this.milestoneDrink ? 5 : 0);
  }
  hasMilestone(milestone: string) {
    switch (milestone) {
      case 'burger':
        return this.milestoneBurger;
      case 'pizza':
        return this.milestonePizza;
      case 'drink':
        return this.milestoneDrink;
      case 'lowerPrice':
        return this.milestoneLowerPrice;
      default:
        return false;
    }
  }
}