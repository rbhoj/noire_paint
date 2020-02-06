class MainScene {
  constructor(scene, messageCenter, player) {
    this._scene = scene;
    this._messageCenter = messageCenter;
    this._player = player;

    this._data = null;

    this._initScene();
  }

  get data() {
    return this._data;
  }

  _preload() {

  }

  _create() {
    console.log("MainScene created!");

    this._player.init(this._data);
  }

  _update() {
    this._player.update();
  }


  _shutdown() {
    console.log("MainScene dead");
  }


  _initScene() {
    this._data = this._createScene('MainScene', this._preload, this._create, this._update);
  }

  _createScene(key, preload, create, update) {
    return this._scene.createScene(key, preload, create, update, this);
  }
}

export default MainScene;
