new function() {

    mlm.package(this, {
        name:    "team",
        imports: "mlm,miruken.mvc,miruken.validate",
        exports: "CreateTeamController"
    });

    eval(this.imports);

    const CreateTeamController = Controller.extend(ColorStyleMixin, {
        $properties:{
            title:      "Create-A-Team",
            buttonText: "Create Team",
            team:       { validate: $nested },
            color:      Color
        },
        constructor() {
            this.team = new Team({
            coach:   {},
            manager: {},
            color:   "white"
            });
        },

        createTeam() {
            return ViewRegion(this.io).show("app/team/createTeam");
        },
        get hasManager(){
            return this.team.manager.fullName;
        },
        get hasCoach(){
            return this.team.coach.fullName;
        },
        selectColor(color) {
            this.team.color = color;
        },
        saveTeam() {
            return TeamFeature(this.ifValid)
                .createTeam(this.team)
                .then(team => TeamController(this.io).next(
                    ctrl => ctrl.showTeam({ id: this.team.id })));
        }
    });

    eval(this.exports);

};
