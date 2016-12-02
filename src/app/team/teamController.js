new function() {

    mlm.package(this, {
        name:    "team",
        imports: "miruken.mvc,mlm",
        exports: "TeamController"
    });

    eval(this.imports);

    const TeamController = Controller.extend({
        $properties:{
            team: undefined
        },

        showTeam({id} = params) {
            return TeamFeature(this.io)
                .team(id).then(team => {
                    this.team = team;
                    return ViewRegion(this.io).show("app/team/team");
                });
        },

        editTeam() {
            return mlm.team.EditTeamController(this.io).next(
                ctrl => ctrl.editTeam({id: this.team.id}));
        }
    });

    eval(this.exports);

};

