class Joystick {
  constructor() {
    this._scene = null;
    this._keys = [];
  }

  set scene(sc) {
    this._scene = sc;
  }

  createNew(scene) {
    let o = new Joystick();
    o.scene = scene;

    return o;
  }

  addKey(key, f, context) {
    let g = f.bind(context);
    let keyObj = this._scene.input.keyboard.addKey(key);

    keyObj.on('down', (event) => {
      g(event);
    });

    this._keys.push(keyObj);
  }

  removeKeys() {
    for (let c = 0; c < this._keys.length; c++) {
      let key = this._keys[c];
      key.destroy();
    }

    this._keys = [];
  }
}

export default Joystick;
