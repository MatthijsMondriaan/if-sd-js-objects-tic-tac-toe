export default class Player {
  constructor(name, symbol, isActive = false) {
    this.name = name;
    this.symbol = symbol;
    this.isActive = isActive;
  }
}
