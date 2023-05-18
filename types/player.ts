export class Player {

  id: number;
  name: string = 'Player ';
  hide: boolean = false;
  turnOrder: number = 0;
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

  constructor(id: number) {
    this.id = id;
    this.name += id;
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