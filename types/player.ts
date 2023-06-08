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
  baseUnitPrice: number = 10;
  restaurant: Restaurant;
  foodsAndDrinks: Map<string, number> = new Map<string, number>();
  milestones: Map<string, boolean> = new Map<string, boolean>();
  employees: Map<string, number> = new Map<string, number>();
  turnAmount: number = 0;
  distances = new Map<number, number>();

  constructor(name: string, restaurant_id: number) {
    this.name = name;
    this.restaurant = useMainStore().getRestaurant(restaurant_id)!;
    this.resetFoodAndDrink();
    this.resetMilestones();
    this.resetEmployees();
  }
  getUnitPrice(multiplier: number = 1) {
    return (this.baseUnitPrice +
      this.getEmployee(Employee.DISCOUNT_MANAGER)! * -3 +
      this.getEmployee(Employee.PRICING_MANAGER)! * -1 +
      this.getEmployee(Employee.LUXURIES_MANAGER)! * 10 +
      (this.hasMilestone(Milestone.LOWER_PRICE) ? -1 : 0)) * multiplier;
  }
  getBurgerSellingPrice(multiplier: number = 1) {
    return this.getUnitPrice() * multiplier + (this.hasMilestone(Milestone.BURGER) ? 5 : 0);
  }
  getPizzaSellingPrice(multiplier: number = 1) {
    return this.getUnitPrice() * multiplier + (this.hasMilestone(Milestone.PIZZA) ? 5 : 0);
  }
  getDrinkSellingPrice(multiplier: number = 1) {
    return this.getUnitPrice() * multiplier + (this.hasMilestone(Milestone.DRINK) ? 5 : 0);
  }
  hasMilestone(milestone: string) {
    return this.milestones.get(milestone);
  }
  setMilestone(milestone: string, value: boolean) {
    this.milestones.set(milestone, value);
  }
  getNbrOfEmployee() {
    let sum = 0;
    for (let nbItems of this.employees.values()) {
      sum += nbItems;
    }
    return sum;
  }
  getEmployee(employee: string) {
    return this.employees.get(employee);
  }
  increaseNbrOfEmployee(employee: string) {
    let nbItems = this.employees.get(employee)!;
    if (employee === Employee.CFO && nbItems === 1) return;
    this.employees.set(employee, nbItems + 1);
  }
  getNbrOfProduct() {
    let sum = 0;
    for (let nbItems of this.foodsAndDrinks.values()) {
      sum += nbItems;
    }
    return sum;
  }
  getFoodAndDrink(foodAndDrink: string) {
    return this.foodsAndDrinks.get(foodAndDrink);
  }
  setFoodAndDrinkAndDrink(foodAndDrink: string, value: number) {
    if (value < 0) return;
    if (foodAndDrink === Product.KIMCHI && value > 2) return;
    this.foodsAndDrinks.set(foodAndDrink, value);
  }
  increaseFoodAndDrink(foodAndDrink: string, value: number = 1) {
    let nbItems = this.foodsAndDrinks.get(foodAndDrink)!;
    if (foodAndDrink === Product.KIMCHI && nbItems + value > 2) return;
    this.foodsAndDrinks.set(foodAndDrink, nbItems + value);
  }
  resetFoodAndDrink() {
    this.foodsAndDrinks.clear();
    for (const product in Product) {
      this.foodsAndDrinks.set(Product[product as keyof typeof Product], 0);
    }
  }
  resetMilestones() {
    this.milestones.clear();
    for (const milestone in Milestone) {
      this.milestones.set(Milestone[milestone as keyof typeof Milestone], false);
    }
  }
  resetEmployees() {
    this.employees.clear();
    for (const employee in Employee) {
      this.employees.set(Employee[employee as keyof typeof Employee], 0);
    }
  }
  resetDistances() {
    this.distances.clear();
    useMainStore().houses.forEach(house => {
      this.distances.set(house.id, Number.NaN);
    });
  }
  getDistanceTo(house_id: number) {
    return this.distances.get(house_id);
  }
  setDistanceTo(house_id: number, distance: number) {
    this.distances.set(house_id, distance);
  }
  sortByPriceAndDistance(house_id: number) {
    return this.getDistanceTo(house_id)! + this.getUnitPrice();
  }
}