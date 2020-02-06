class Entity {
  constructor() {
    this._x = 0;
    this._y = 0;
    this._startX = 0;
    this._startY = 0;

    this._surface = null;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get startX() {
    return this._startX;
  }

  get startY() {
    return this._startY;
  }

  set x(xVal) {
    this._x = xVal;
    if(this._surface != null) this._updateSurface();
  }

  set y(yVal) {
    this._y = yVal;
    if(this._surface != null) this._updateSurface();
  }

  set startX(sxVal) {
    this._startX = sxVal;
    if(this._surface != null) this._updateSurface();
  }

  set startY(syVal) {
    this._startY = syVal;
    if(this._surface != null) this._updateSurface();
  }

  initSprite(scene, sprName) {
    this._surface = scene.add.sprite(this._x, this._y, 'mainsheet', sprName);

    this._updateSurface();
  }

  createNew(x, y, startX, startY) {
    let o = new Entity();

    o.x = x;
    o.y = y;
    o.startX = startX;
    o.startY = startY;

    return o;
  }

  _updateSurface() {
    this._surface.x = this._x;
    this._surface.y = this._y;
    this._surface.displayOriginX = this._startX;
    this._surface.displayOriginY = this._startY;
  }
}

export default Entity;
