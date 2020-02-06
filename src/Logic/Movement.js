class Movement {
  constructor(accuTime) {
    this._accuTime = accuTime;

    this._speed = 60;
    this._moveList = [];

    this._command = 0;
  }

  addMove(x, y, type, time) {
    let move = {x: x, y: y, time: time, xSpeed: 0, ySpeed: 0, command: this._command};

    this._command++;

    if (type == 'left') {
      move.xSpeed = -1;
      move.ySpeed = 0;
    } else if (type == 'right') {
      move.xSpeed = 1;
      move.ySpeed = 0;
    } else if (type == 'up') {
      move.xSpeed = 0;
      move.ySpeed = -1;
    } else if (type == 'down') {
      move.xSpeed = 0;
      move.ySpeed = 1;
    }

    this._addMove(move);
  }

  getPosition() {
    let lim = this._moveList.length;
    if (lim <= 0) return null;

    let posX = this._moveList[0].x;
    let posY = this._moveList[0].y;

    for (let c = 0; c < (lim - 1); c++) {
      let move = this._moveList[c];
      let next = this._moveList[c + 1];

      let elapsed = (next.time - move.time) / 1000;

      posX = posX + (elapsed * this._speed * move.xSpeed);
      posY = posY + (elapsed * this._speed * move.ySpeed);
    }

    let move = this._moveList[lim - 1];
    let elapsed = (this._getTime() - move.time) / 1000;

    posX = posX + (elapsed * this._speed * move.xSpeed);
    posY = posY + (elapsed * this._speed * move.ySpeed);

    return {x: posX, y: posY};
  }

  _removeTop() {
    let lim = this._moveList.length;

    let posX = this._moveList[0].x;
    let posY = this._moveList[0].y;

    let move = this._moveList[0];
    let next = this._moveList[1];

    let elapsed = (next.time - move.time) / 1000;

    posX = posX + (elapsed * this._speed * move.xSpeed);
    posY = posY + (elapsed * this._speed * move.ySpeed);

    next.x = posX;
    next.y = posY;

    this._moveList.shift();
  }

  _addMove(move) {
    if (this._moveList.length != 0) {
      move.x = 0;
      move.y = 0;
    }

    if (this._moveList.length == 5) this._removeTop();

    this._moveList.push(move);
  }

  _getTime() {
    return this._accuTime.getTime();
  }
}

export default Movement;
