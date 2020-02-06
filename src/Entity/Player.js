class Player {
  constructor(person, joystick) {
    this._person = person;
    this._joystick = joystick;

    this._moveControl = null;
  }

  get x() {
    return this._person.x;
  }

  get y() {
    return this._person.y;
  }

  init(scene) {
    this._person.init(scene, 'rudrabhoj');

    this._setupMoveControl(scene);
  }

  update() {
    this._person.update();
  }

  _setupMoveControl(scene) {
    this._moveControl = this._joystick.createNew(scene);

    this._moveControl.addKey('LEFT',  this._leftPressed,  this);
    this._moveControl.addKey('RIGHT', this._rightPressed, this);
    this._moveControl.addKey('UP',    this._upPressed,    this);
    this._moveControl.addKey('DOWN',  this._downPressed,  this);
  }

  _leftPressed() {
    this._person.moveLeft();
  }

  _rightPressed() {
    this._person.moveRight();
  }

  _upPressed() {
    this._person.moveUp();
  }

  _downPressed() {
    this._person.moveDown();
  }
}

export default Player;
