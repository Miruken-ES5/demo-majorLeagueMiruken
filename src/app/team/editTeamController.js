new function() {

    mlm.package(this, {
        name:    "team",
        imports: "miruken.mvc,mlm,mlm.player",
        exports: "EditTeamController"
    });

    eval(this.imports);

    const EditTeamController = Controller.extend(MasterDetail, ColorStyleMixin, {
        $properties:{
            title:      "Edit Team",
            buttonText: "Save",
            team:       {
                validate: {
                    presence: true,
                    nested:   true
                }
            }
        },

        getSelectedDetail(type) {
            return type === Team
                ? Promise.resolve(this.team)
                : $NOT_HANDLED;
        },

        editTeam({id} = params) {
            const io = this.io;
            return TeamFeature(io)
                .team(id).then(team => {
                    this.team = team;
                    return ViewRegion(io).show("app/team/editTeam");
                });
        },
        addPlayer() {
            const io = this.io;
            ChoosePlayerController(io)
                .push(ctrl => ctrl.choosePlayer())
                .then(players => {
                    if (players) {
                        TeamFeature(io).addPlayers(players, this.team);
                    }
                });
        },
        selectColor(color) {
            this.team.color = color;
        },
        saveTeam() {
            return TeamFeature(this.ifValid)
                .updateTeam(this.team)
                .then(team => mlm.team.TeamController(this.io)
                    .next(ctrl => ctrl.showTeam({id: team.id})));
        }
    });

    eval(this.exports);

};
