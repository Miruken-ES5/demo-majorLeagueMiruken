new function() {

  mlm.package(this, {
    name:    "player",
    imports: "miruken.mvc",
    exports: "PlayerController"
  });

  eval(this.imports);

  const PlayerController = Controller.extend({
    $properties:{
      message: "I'm the player controller"
    }
  });

  eval(this.exports);

};
