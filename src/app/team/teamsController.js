new function() {

    mlm.package(this, {
        name:    "team",
        imports: "mlm,miruken.mvc",
        exports: "TeamsController"
    });

    eval(this.imports);

    const TeamsController= Controller.extend({
        $properties:{
            teams: []
        },
        initialize() {
            this.base();
            return TeamFeature(this.io).teams()
                .then(teams => this.teams = teams);
        },

        showTeams() {
            return ViewRegion(this.io).show("app/team/teams");
        },
        goToTeam(team) {
            TeamController(this.io).next(ctrl => ctrl.showTeam({ id: team.id }));
        },
        createTeam() {
            CreateTeamController(this.io).next(ctrl => ctrl.createTeam());
        }

    });

    eval(this.exports);

};
