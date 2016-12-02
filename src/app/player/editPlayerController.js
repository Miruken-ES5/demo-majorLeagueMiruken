new function() {

    mlm.package(this, {
        name:    "player",
        imports: "mlm,miruken.mvc",
        exports: "EditPlayerController"
    });

    eval(this.imports);

    const EditPlayerController = Controller.extend({
        $properties:{
            title:      "Edit Player",
            buttonText: "Save",
            player:     { 
                validate: {
                    presence: true,
                    nested:   true
                }
            }
        },

        showEditPlayer({id} = params) {
            const io = this.io;
            PlayerFeature(io)
                .player(id).then(player => {
                    this.player = player;
                    return ViewRegion(io).show("app/player/createEditPlayer");
                });
        },
        savePlayer() {
            return PlayerFeature(this.ifValid)
                .updatePlayer(this.player)
                .then(() => mlm.player.PlayerController(this.io)
                    .next(ctrl => ctrl.showPlayer({ id: this.player.id })));
        }
    });

    eval(this.exports);

};
