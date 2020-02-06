import Phaser from "phaser";

class Externs {
  constructor() {
    this._phaser = Phaser;
  }

  get phaser() {
    return this._phaser;
  }
}

export default Externs;
