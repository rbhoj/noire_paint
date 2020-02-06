class Person {
  constructor(entity, movement, accuTime) {
    this._entity = entity;
    this._movement = movement;
    this._accuTime = accuTime;

    this._speed = 20; //pixel per second
  }

  get x() {
    return this._entity.x;
  }

  get y() {
    return this._entity.y;
  }

  init(scene, picture) {
    this._entity = this._entity.createNew(100, 100, 0, 0);
    this._entity.initSprite(scene, picture);
  }

  moveLeft() {
    this._movement.addMove(this._entity.x, this._entity.y, 'left', this._getTime());
  }

  moveRight() {
    this._movement.addMove(this._entity.x, this._entity.y, 'right', this._getTime());
  }

  moveUp() {
    this._movement.addMove(this._entity.x, this._entity.y, 'up', this._getTime());
  }

  moveDown() {
    this._movement.addMove(this._entity.x, this._entity.y, 'down', this._getTime());
  }

  update() {
    let pos = this._movement.getPosition();

    if (pos != null) {
      this._entity.x = this._round(pos.x);
      this._entity.y = this._round(pos.y);
    }
  }

  _round(n) {
    return Math.round(n);
  }

  _getTime() {
    return this._accuTime.getTime();
  }
}

export default Person;
