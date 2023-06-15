import { useMainStore } from "~/stores/main";
import { House } from "./house";
import { Employee, Milestone, Product, Restaurant } from "./types";
import { DataService } from "./data.service";

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
        this.restaurant = DataService.getRestaurantById(restaurant_id)!;
        this.resetFoodAndDrink();
        this.resetMilestones();
        this.resetEmployees();
    }
    getTurnOrder(): number {
        return this.turnOrder;
    }
    getUnitPrice(multiplier: number = 1): number {
        return (this.baseUnitPrice +
            this.getEmployee(Employee.DISCOUNT_MANAGER)! * -3 +
            this.getEmployee(Employee.PRICING_MANAGER)! * -1 +
            this.getEmployee(Employee.LUXURIES_MANAGER)! * 10 +
            (this.hasMilestone(Milestone.LOWER_PRICE) ? -1 : 0)) * multiplier;
    }
    getFinalUnitPrice(foodAndDrinkType: string, multiplier: number = 1): number {
        return this.getUnitPrice(multiplier) +
            (this.hasMilestone(Milestone.BURGER) && foodAndDrinkType == Product.BURGER ? 5 : 0) +
            (this.hasMilestone(Milestone.PIZZA) && foodAndDrinkType == Product.PIZZA ? 5 : 0) +
            (this.hasMilestone(Milestone.DRINK) && (foodAndDrinkType == Product.COKE || foodAndDrinkType == Product.BEER || foodAndDrinkType == Product.JUICE) ? 5 : 0)
    }
    hasMilestone(milestone: string): boolean {
        return this.milestones.get(milestone) || false;
    }
    setMilestone(milestone: string, value: boolean): void {
        this.milestones.set(milestone, value);
    }
    getNbrOfEmployee(): number {
        let sum = 0;
        for (let nbItems of this.employees.values()) {
            sum += nbItems;
        }
        return sum;
    }
    getEmployee(employee: string): number {
        return this.employees.get(employee) || 0;
    }
    increaseNbrOfEmployee(employee: string, value: number = 1): void {
        let nbItems = this.employees.get(employee)!;
        const x1 = [Employee.NIGHT_SHIFT, Employee.LUXURIES_MANAGER, Employee.CFO, Employee.MOVIE_STAR_B, Employee.MOVIE_STAR_C, Employee.MOVIE_STAR_D];
        if (x1.includes(employee as Employee) && nbItems === 1) return;
        if (nbItems + value < 0) value = -nbItems;
        this.employees.set(employee, nbItems + value);
    }
    getNbrOfProduct(): number {
        let sum = 0;
        for (let nbItems of this.foodsAndDrinks.values()) {
            sum += nbItems;
        }
        return sum;
    }
    getFoodAndDrink(foodAndDrink: string): number {
        return this.foodsAndDrinks.get(foodAndDrink) || 0;
    }
    setFoodAndDrinkAndDrink(foodAndDrink: string, value: number): void {
        let nbItems = this.foodsAndDrinks.get(foodAndDrink)!;
        const maxItems = this.getMaxFoodAndDrink(foodAndDrink);
        if (nbItems + value > maxItems) value = maxItems - nbItems;
        if (nbItems + value < 0) value = -nbItems;
        this.foodsAndDrinks.set(foodAndDrink, value);
    }
    increaseFoodAndDrink(foodAndDrink: string, value: number = 1): void {
        let nbItems = this.foodsAndDrinks.get(foodAndDrink)!;
        const maxItems = this.getMaxFoodAndDrink(foodAndDrink);
        if (nbItems + value > maxItems) value = maxItems - nbItems;
        if (nbItems + value < 0) value = -nbItems;
        this.foodsAndDrinks.set(foodAndDrink, nbItems + value);
    }
    getMaxFoodAndDrink(foodAndDrink: string): number {
        if (foodAndDrink === Product.KIMCHI) return 11;
        return Number.MAX_VALUE;
    }
    resetFoodAndDrink(): void {
        this.foodsAndDrinks.clear();
        for (const product in Product) {
            this.foodsAndDrinks.set(Product[product as keyof typeof Product], 0);
        }
    }
    resetMilestones(): void {
        this.milestones.clear();
        for (const milestone in Milestone) {
            this.milestones.set(Milestone[milestone as keyof typeof Milestone], false);
        }
    }
    resetEmployees(): void {
        this.employees.clear();
        for (const employee in Employee) {
            this.employees.set(Employee[employee as keyof typeof Employee], 0);
        }
    }
    resetDistances(): void {
        this.distances.clear();
        useMainStore().houses.forEach(house => {
            this.distances.set(house.id, Number.NaN);
        });
    }
    getDistanceTo(house_id: number): number {
        return this.distances.get(house_id) || Number.NaN;
    }
    setDistanceTo(house_id: number, distance: number): void {
        if (distance < 0) distance = Number.NaN;
        this.distances.set(house_id, distance);
    }
    getPriceAndDistance(house_id: number): number {
        let priceAndDistance = this.getDistanceTo(house_id)! + this.getUnitPrice();
        if (this.hasMilestone(Milestone.KETCHUP) && priceAndDistance > 0)
            priceAndDistance--;
        return priceAndDistance;
    }
    hasKimchi(): boolean {
        return this.getFoodAndDrink(Product.KIMCHI)! > 0;
    }
    hasHouseNeeds(house: House): boolean {
        for (const [product, need] of house.needs) {
            if (this.getFoodAndDrink(product)! < need) return false;
        }
        return true;
    }
    hasSushiNeeds(house: House): boolean {
        if (!house.garden) return false;
        return this.getFoodAndDrink(Product.SUSHI)! >= house.getNbrOfNeeds();
    }
    hasNoodleNeeds(house: House): boolean {
        return this.getFoodAndDrink(Product.NOODLE)! >= house.getNbrOfNeeds();
    }
    clone(): Player {
        let clone = new Player(this.name, this.restaurant.id);
        clone.turnOrder = this.turnOrder;
        clone.foodsAndDrinks = new Map<string, number>(this.foodsAndDrinks);
        clone.milestones = new Map<string, boolean>(this.milestones);
        clone.employees = new Map<string, number>(this.employees);
        clone.distances = new Map<number, number>(this.distances);
        return clone;
    }
    static sortByRules(a: Player, b: Player, house_id: number): number {
        let nbWaitressA = a.getEmployee(Employee.WAITRESS)!;
        if (a.getEmployee(Employee.NIGHT_SHIFT)!)
            nbWaitressA *= 2;
        let nbWaitressB = b.getEmployee(Employee.WAITRESS)!;
        if (b.getEmployee(Employee.NIGHT_SHIFT)!)
            nbWaitressB *= 2;
        return a.getPriceAndDistance(house_id) - b.getPriceAndDistance(house_id) ||
            b.getEmployee(Employee.MOVIE_STAR_B)! - a.getEmployee(Employee.MOVIE_STAR_B)! ||
            b.getEmployee(Employee.MOVIE_STAR_C)! - a.getEmployee(Employee.MOVIE_STAR_C)! ||
            b.getEmployee(Employee.MOVIE_STAR_D)! - a.getEmployee(Employee.MOVIE_STAR_D)! ||
            nbWaitressB - nbWaitressA ||
            a.getTurnOrder() - b.getTurnOrder();
    }
}