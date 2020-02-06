import SmartDepend      from '../Dep/SmartDepend.js';

//Control
  //Control
  import Kernel        from '../Control/Kernel.js';
  import MessageCenter from '../Control/MessageCenter.js';

//Dep
  //Dep
  import Externs      from '../Dep/Externs.js';

//Engine
  //Engine
  import Entity      from '../Engine/Entity.js';
  import Joystick    from '../Engine/Joystick.js';
  import Scene       from '../Engine/Scene.js';
  import World       from '../Engine/World.js';

//Entity
  //Entity
  import Person      from '../Entity/Person.js';
  import Player      from '../Entity/Player.js';

//Logic
  //Logic
  import Movement      from '../Logic/Movement.js';

//Scene
  //Scene
  import LoadScene   from '../Scene/LoadScene.js';
  import MainScene   from '../Scene/MainScene.js';

//Util
  //Util
  import AccuTime    from '../Util/AccuTime.js';


class DependencyBoss {
  constructor() {
    this._allocateResources();

    this._setupTypes();
    this._decorate();
    this._injectDependencies();
    this._declareBindings();

    this._generateObjects();
  }

  getMainObj() {
    return this._mainObj;
  }

  _allocateResources() {
    this._depManager = new SmartDepend();
    this._container = this._getDepContainer();
  }

  _setupTypes() {
    this._types = {
      //Control
        //Control
        Kernel        : {name: "Kernel",          class: Kernel,        single: false},
        MessageCenter : {name: "MessageCenter",   class: MessageCenter, single: true},

      //Dep
        //Dep
        Externs       : {name: "Externs",         class: Externs,       single: true},

      //Engine
        //Engine
        Entity        : {name: "Entity",          class: Entity,        single: false},
        Joystick      : {name: "Joystick",        class: Joystick,      single: false},
        Scene         : {name: "Scene",           class: Scene,         single: false},
        World         : {name: "World",           class: World,         single: true},

      //Entity
        //Entity
        Person        : {name: "Person",          class: Person,        single: false},
        Player        : {name: "Player",          class: Player,        single: false},

      //Logic
        //Logic
        Movement      : {name: "Movement",        class: Movement,      single: false},

      //Scene
        //Scene
        LoadScene     : {name: "LoadScene",       class: LoadScene,     single: false},
        MainScene     : {name: "MainScene",       class: MainScene,     single: false},

      //Util
        //Util
        AccuTime      : {name: "AccuTime",        class: AccuTime,      single: false}
    }

    this._addObjects();
  }

  _addObjects() {
    for (let type in this._types) {
      if(this._types[type].single) {
        //console.log("NAME OF SINGLE: %s", this._types[type].name);
      }
      this._addType(this._types[type].name,  this._types[type].class, this._types[type].single);
    }
  }

  _injectDependencies() {
    //Control
      //Control
      this._addDependency(this._types.Kernel.name,            this._types.World.name);
      this._addDependency(this._types.Kernel.name,            this._types.MessageCenter.name);
      this._addDependency(this._types.Kernel.name,            this._types.MainScene.name);
      this._addDependency(this._types.Kernel.name,            this._types.LoadScene.name);

    //Engine
      //Engine
      this._addDependency(this._types.Scene.name,            this._types.Externs.name);
      this._addDependency(this._types.World.name,            this._types.Externs.name);

    //Entity
      //Entity
      this._addDependency(this._types.Person.name,           this._types.Entity.name);
      this._addDependency(this._types.Person.name,           this._types.Movement.name);
      this._addDependency(this._types.Person.name,           this._types.AccuTime.name);

      this._addDependency(this._types.Player.name,           this._types.Person.name);
      this._addDependency(this._types.Player.name,           this._types.Joystick.name);
      
    //Logic
      //Logic
      this._addDependency(this._types.Movement.name,         this._types.AccuTime.name);

    //Scene
      //Scene
      this._addDependency(this._types.LoadScene.name,        this._types.Scene.name);
      this._addDependency(this._types.LoadScene.name,        this._types.MessageCenter.name);
      this._addDependency(this._types.LoadScene.name,        this._types.Externs.name);

      this._addDependency(this._types.MainScene.name,        this._types.Scene.name);
      this._addDependency(this._types.MainScene.name,        this._types.MessageCenter.name);
      this._addDependency(this._types.MainScene.name,        this._types.Player.name);
  }

  _generateObjects() {
    this._mainObj  = this._container.get(this._types.Kernel.name);
  }

  //Foreign dependencies
  _addDependency(type, dependency) {
    this._depManager.addDependency(type, dependency);
  }

  _addType(typeName, typeClass, typeSingle) {
    this._depManager.addObject(typeName, typeClass, typeSingle);
  }

  _decorate() {
    this._depManager.decorate();
  }

  _declareBindings() {
    this._depManager.bindAll();
  }

  _getDepContainer() {
    return this._depManager.container;
  }
}


export default DependencyBoss;
