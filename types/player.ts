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
  PRICING_MANAGER = 'pricingManager',
  DISCOUNT_MANAGER = 'discountManager',
  LUXURIES_MANAGER = 'luxuriesManager',
  CFO = 'cfo',
  WAITRESS = 'waitress',
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
  setMilestone(milestone: string, value: boolean) {
    switch (milestone) {
      case 'burger':
        this.milestoneBurger = value;
        break;
      case 'pizza':
        this.milestonePizza = value;
        break;
      case 'drink':
        this.milestoneDrink = value;
        break;
      case 'lowerPrice':
        this.milestoneLowerPrice = value;
        break;
      default:
        break;
    }
  }
  getMilestoneDisplay(milestone: string) {
    switch (milestone) {
      case 'burger':
        return 'First burger marketed';
      case 'pizza':
        return 'First pizza marketed';
      case 'drink':
        return 'First drink marketed';
      case 'price':
        return 'First to lower prices';
      default:
        return '';
    }
  }
  setFood(food: string, value: number) {
    switch (food) {
      case 'burger':
        this.nbrOfBurger = value;
        break;
      case 'pizza':
        this.nbrOfPizza = value;
        break;
      case 'beer':
        this.nbrOfBeer = value;
        break;
      case 'coke':
        this.nbrOfCoke = value;
        break;
      case 'juice':
        this.nbrOfJuice = value;
        break;
      case 'sushi':
        this.nbrOfSushi = value;
        break;
      case 'noodle':
        this.nbrOfNoodle = value;
        break;
      case 'kimchi':
        this.nbrOfKimchi = value;
        break;
      default:
        break;
    }
  }
  increaseFood(food: string) {
    switch (food) {
      case 'burger':
        this.nbrOfBurger++;
        break;
      case 'pizza':
        this.nbrOfPizza++;
        break;
      case 'beer':
        this.nbrOfBeer++;
        break;
      case 'coke':
        this.nbrOfCoke++;
        break;
      case 'juice':
        this.nbrOfJuice++;
        break;
      case 'sushi':
        this.nbrOfSushi++;
        break;
      case 'noodle':
        this.nbrOfNoodle++;
        break;
      case 'kimchi':
        if (this.nbrOfKimchi < 2)
          this.nbrOfKimchi++;
        break;
      default:
        break;
    }
  }
  increaseFoodx5(food: string) {
    switch (food) {
      case 'burger':
        this.nbrOfBurger += 5;
        break;
      case 'pizza':
        this.nbrOfPizza += 5;
        break;
      case 'beer':
        this.nbrOfBeer += 5;
        break;
      case 'coke':
        this.nbrOfCoke += 5;
        break;
      case 'juice':
        this.nbrOfJuice += 5;
        break;
      case 'sushi':
        this.nbrOfSushi += 5;
        break;
      case 'noodle':
        this.nbrOfNoodle += 5;
        break;
      case 'kimchi':
        this.nbrOfKimchi += 5;
        if (this.nbrOfKimchi > 2)
          this.nbrOfKimchi = 2;
        break;
      default:
        break;
    }
  }
  resetFood() {
    this.setFood('burger', 0);
    this.setFood('pizza', 0);
    this.setFood('beer', 0);
    this.setFood('coke', 0);
    this.setFood('juice', 0);
    this.setFood('sushi', 0);
    this.setFood('noodle', 0);
    this.setFood('kimchi', 0);
  }
}