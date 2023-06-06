export class House {

  id: number;
  name: string;
  apartment: boolean = false;
  garden: boolean = false;
  gardenReadOnly: boolean = false;
  park: boolean = false;
  needBurger: number = 0;
  needPizza: number = 0;
  needBeer: number = 0;
  needCoke: number = 0;
  needJuice: number = 0;

  constructor(id: number, garden: boolean = false) {
    this.id = id;
    this.name = id.toString();
    if (id === 3.14) this.name = 'π', this.apartment = true;
    if (id === 9.75) this.name = '9 3/4', this.apartment = true;
    this.garden = garden;
    this.gardenReadOnly = garden;
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
  increaseNeed(food: string) {
    switch (food) {
      case 'burger':
        this.needBurger++;
        break;
      case 'pizza':
        this.needPizza++;
        break;
      case 'beer':
        this.needBeer++;
        break;
      case 'coke':
        this.needCoke++;
        break;
      case 'juice':
        this.needJuice++;
        break;
      default:
        break;
    }
  }
  setNeed(food: string, value: number) {
    switch (food) {
      case 'burger':
        this.needBurger = value;
        break;
      case 'pizza':
        this.needPizza = value;
        break;
      case 'beer':
        this.needBeer = value;
        break;
      case 'coke':
        this.needCoke = value;
        break;
      case 'juice':
        this.needJuice = value;
        break;
      default:
        break;
    }
  }
  resetNeed() {
    this.setNeed('burger', 0);
    this.setNeed('pizza', 0);
    this.setNeed('beer', 0);
    this.setNeed('coke', 0);
    this.setNeed('juice', 0);
  }
  countNeed() {
    return this.needBurger + this.needPizza + this.needBeer + this.needCoke + this.needJuice;
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