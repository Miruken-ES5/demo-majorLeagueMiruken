new function() {
    mlm.package(this, {
        name:    "team",
        imports: "miruken",
        exports: "TeamFeature",
    });

    eval(this.imports);

    const TeamFeature = StrictProtocol.extend(Resolving, {
        createTeam(team)          {},
        deleteTeam(team)          {},
        editTeam(team)            {},
        teams()                   {},
        team(id)                  {},
        updateTeam(team)          {},
        addPlayers(players, team) {}
    });

    eval(this.exports);

};
