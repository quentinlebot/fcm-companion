import { Restaurant, usePlayerStore } from "~/stores/player";

export class Player {

  name: string = 'Player ';
  hide: boolean = false;
  turnOrder: number = -1;
  milestoneBurger: boolean = false;
  milestonePizza: boolean = false;
  milestoneDrink: boolean = false;
  milestoneLowerPrice: boolean = false;
  discountManager: number = 0;
  pricingManager: number = 0;
  luxuryManager: number = 0;
  baseUnitPrice: number = 10;
  waitress: number = 0;
  cfo: number = 0;
  restaurant: Restaurant;


  constructor(name: string, restaurant_id: number) {
    this.name = name;
    this.restaurant = usePlayerStore().getRestaurant(restaurant_id)!;
  }

  getUnitPrice(multiplier: number = 1) {
    return (this.baseUnitPrice +
      this.discountManager * -3 +
      this.pricingManager * -1 +
      this.luxuryManager * 10 +
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

}