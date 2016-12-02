new function() {

    mlm.package(this, {
        name:    "player",
        imports: "mlm,miruken.mvc",
        exports: "ChoosePlayerController"
    });

    eval(this.imports);

    const ChoosePlayerController = Controller.extend({
        $properties:{
            players: [],
            player:  null,
            team:    null
        },

        initialize() {
            const io = this.io;
            return MasterDetail(io)
                .getSelectedDetail(Team).then(team => {
                    this.team = team;
                    return PlayerFeature(io).players();
                }).then(players => {
                    this.players = players.filter(p => p.teamId != this.team.id);
                });
        },

        choosePlayer() {
            return ViewRegion(this.io.modal({
                title:   "Select Your Players",
                buttons: [
                    { text: "Ok",     css: "btn-sm btn-primary" },
                    { text: "Cancel", css: "btn-sm", tag: -1 }
                ]
            })).show("app/player/choosePlayer")
               .then(layer => layer.modalResult.then(result => {
                   if (result && result.button.tag != -1) {
                       return this.selectedPlayers;
                   }
               })).finally(() => this.endContext());
        }
    });

    eval(this.exports);

};

