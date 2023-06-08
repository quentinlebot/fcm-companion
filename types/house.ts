import { Product } from "./player";

export class House {

  id: number;
  name: string;
  apartment: boolean = false;
  garden: boolean = false;
  gardenReadOnly: boolean = false;
  park: boolean = false;
  needs: Map<string, number> = new Map<string, number>();

  constructor(id: number, garden: boolean = false) {
    this.id = id;
    this.name = id.toString();
    if (id === 3.14) this.name = 'π', this.apartment = true;
    if (id === 9.75) this.name = '9 3/4', this.apartment = true;
    this.garden = garden;
    this.gardenReadOnly = garden;
    this.resetNeeds();
  }

  getMultiplier() {
    let multiplier = 1;
    if (this.park) multiplier += 1;
    if (this.garden) multiplier += 1;
    return multiplier;
  }
  setPark() {
    this.park = !this.park;
  }
  setGarden() {
    this.garden = !this.garden;
  }
  resetNeeds() {
    this.needs.clear();
    for (const product in Product) {
      if ([Product.BURGER, Product.PIZZA, Product.BEER, Product.COKE, Product.JUICE].includes(Product[product as keyof typeof Product])) {
        this.needs.set(Product[product as keyof typeof Product], 0);
      }
    }
  }
  increaseNeed(food: string) {
    let nbItems = this.needs.get(food)!;
    this.needs.set(food, nbItems + 1);
  }
  setNeed(food: string, value: number) {
    if (value < 0) return;
    this.needs.set(food, value);
  }
  getNeed(food: string) {
    return this.needs.get(food);
  }
  getNbrOfNeeds() {
    let sum = 0;
    for (let nbItems of this.needs.values()) {
      sum += nbItems;
    }
    return sum;
  }

  // getPlayersFromRules() {
  //   return [...this.distPlayer].sort((a, b) => {
  //     let playerA = playerGlobal.getPlayerById(a.id);
  //     let playerB = playerGlobal.getPlayerById(b.id);
  //     if (playerA && playerB) {
  //       if (toNumber(playerA.getUnitPrice()) + toNumber(a.dist) > toNumber(playerB.getUnitPrice()) + toNumber(b.dist)) return +1;
  //       if (toNumber(playerA.getUnitPrice()) + toNumber(a.dist) < toNumber(playerB.getUnitPrice()) + toNumber(b.dist)) return -1;
  //       if (playerA.waitress > playerB.waitress) return -1;
  //       if (playerA.waitress < playerB.waitress) return +1;
  //       if (playerA.turnOrder > playerB.turnOrder) return +1;
  //       if (playerA.turnOrder < playerB.turnOrder) return -1;
  //     }
  //     return 0;
  //   });
  // }
  // getPriceFromRules({ id, dist }: { id: number, dist: number }): number {
  //   let p = playerGlobal.getPlayerById(id);
  //   return p ? toNumber(p.getUnitPrice()) + toNumber(dist) : 0;
  // }
  // getPlayerValue({ id, dist, value }: { id: number, dist: number, value: number }) {
  //   const player = playerGlobal.getPlayerById(id);
  //   if (!player || player.hide) return '';
  //   return player.name + '(' + this.getPriceFromRules({ id, dist }) + ')'
  // }
}