export class House {

  id: number;
  name: string;
  appartment: boolean = false;
  garden: boolean = false;
  gardenReadOnly: boolean = false;
  park: boolean = false;

  constructor(id: number, garden: boolean = false) {
    this.id = id;
    this.name = id.toString();
    if (id === 3.14) this.name = 'π', this.appartment = true;
    if (id === 9.75) this.name = '9 3/4', this.appartment = true;
    this.garden = garden;
    this.gardenReadOnly = garden;
  }

  getMultiplier() {
    let multiplier = 1;
    if (this.park) multiplier += 1;
    if (this.garden) multiplier += 1;
    return multiplier;
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