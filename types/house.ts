import { Product } from "./types";

export class House {

    id: number;
    name: string;
    apartment: boolean = false;
    ruralArea: boolean = false;
    garden: boolean = false;
    gardenReadOnly: boolean = false;
    park: boolean = false;
    needs: Map<string, number> = new Map<string, number>();

    constructor(id: number, garden: boolean = false) {
        this.id = id;
        this.name = id.toString();
        if (id === 3.14) this.name = 'π', this.apartment = true;
        if (id === 9.75) this.name = '9 3/4', this.apartment = true;
        if (id === Number.POSITIVE_INFINITY) this.name = '∞', this.ruralArea = true;
        this.garden = garden;
        this.gardenReadOnly = garden;
        this.resetNeeds();
    }

    getMultiplier(): number {
        let multiplier = 1;
        if (this.park) multiplier += 1;
        if (this.garden) multiplier += 1;
        return multiplier;
    }
    setPark(): void {
        this.park = !this.park;
    }
    setGarden(): void {
        if (this.gardenReadOnly) return;
        this.garden = !this.garden;
    }
    resetNeeds(): void {
        this.needs.clear();
        for (const product in Product) {
            if ([Product.BURGER, Product.PIZZA, Product.BEER, Product.COKE, Product.JUICE].includes(Product[product as keyof typeof Product])) {
                this.needs.set(Product[product as keyof typeof Product], 0);
            }
        }
    }
    increaseNeed(food: string): void {
        let nbItems = this.needs.get(food)!;
        let value = this.ruralArea ? 2 : 1;
        if (this.getNbrOfNeeds() + value > this.getMaxNeeds()) return;
        this.needs.set(food, nbItems + value);
    }
    setNeed(food: string, value: number): void {
        let nbItems = this.getNbrOfNeeds();
        if (nbItems + value > this.getMaxNeeds())
            value = this.getMaxNeeds() - nbItems;
        if (nbItems + value < 0)
            value = -nbItems;
        this.needs.set(food, value);
    }
    getNeed(food: string): number {
        return this.needs.get(food) || 0;
    }
    getNbrOfNeeds(): number {
        let sum = 0;
        for (let nbItems of this.needs.values()) {
            sum += nbItems;
        }
        return sum;
    }
    getMaxNeeds(): number {
        if (this.apartment) return Number.MAX_VALUE;
        if (this.ruralArea) return Number.MAX_VALUE;
        if (this.garden) return 5;
        return 3;
    }
    maxNeedReached(): boolean {
        return this.getNbrOfNeeds() >= this.getMaxNeeds();
    }
    static sortById(a: House, b: House): number {
        if (a.id > b.id) return +1;
        if (a.id < b.id) return -1;
        return 0;
    }
}