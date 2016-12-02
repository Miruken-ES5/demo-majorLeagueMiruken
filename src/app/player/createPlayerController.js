new function() {

    mlm.package(this, {
        name:    "player",
        imports: "mlm,miruken.mvc,miruken.validate",
        exports: "CreatePlayerController"
    });

    eval(this.imports);

    const CreatePlayerController = Controller.extend({
        $properties:{
            title:      "Create-A-Player",
            buttonText: "Create Player",
            player:     { validate: $nested }
        },
        constructor() {
            this.player = new Player();
        },

        createPlayer() {
            return ViewRegion(this.io)
                .show("app/player/createEditPlayer");
        },
        savePlayer() {
            return PlayerFeature(this.ifValid)
                .createPlayer(this.player)
                .then(player => PlayerController(this.io).next(
                    ctrl => ctrl.showPlayer({id: player.id })));
        }

    });

    eval(this.exports);

};
