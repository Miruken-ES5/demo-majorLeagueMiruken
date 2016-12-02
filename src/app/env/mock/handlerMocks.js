new function(){

    mlm.package(this, {
        name:    "mock",
        imports: "miruken.callback,mlm,mlm.team,mlm.player",
        exports: "TeamHandlerMock,PlayerHandlerMock"
    });

    eval(this.imports);

    let _id = 0;
    function nextId() {
        return _id = ++_id;
    }

    const teams = [
        new Team({
            id:      nextId(),
            name:    "Dallas",
            color:   Color.blue,
            coach:   { firstName: "David", lastName: "O'Hara" },
            manager: { firstName: "Ric",   lastName: "DeAnda" }}),
        new Team({
            id:      nextId(),
            name:    "College Station",
            color:   Color.maroon,
            coach:   { firstName: "Ed",   lastName: "Grannan" },
            manager: { firstName: "Mike", lastName: "Abney" }}),
        new Team({
            id:      nextId(),
            name:    "Houston",
            color:   Color.lightBlue,
            coach:   { firstName: "Ken",    lastName: "Howard" },
            manager: { firstName: "Devlin", lastName: "Liles" }}),
        new Team({
            id:      nextId(),
            name:    "Columbus",
            color:   Color.red,
            coach:   { firstName: "Mark",    lastName: "Kovacevich" },
            manager: { firstName: "Jacquie", lastName: "Bickel" }}),
        new Team({
            id:      nextId(),
            name:    "Calgary",
            color:   Color.white,
            coach:   { firstName: "Wendy", lastName: "Brown" },
            manager: { firstName: "Brian", lastName: "Donaldson" }}),
        new Team({
            id:      nextId(),
            name:    "Minneapolis",
            color:   Color.yellow,
            coach:   { firstName: "Barb",  lastName: "Gurstelle" },
            manager: { firstName:"Leroy" , lastName: "Thydean" }})];

    const players = [
        new Player({ id: nextId(), teamId: 1, firstName: "Cori",    lastName: "Drew",      birthdate: "06/06/1980", number: 1 }),
        new Player({ id: nextId(), teamId: 1, firstName: "Craig",   lastName: "Neuwirt",   birthdate: "07/19/1970", number: 22 }),
        new Player({ id: nextId(), teamId: 1, firstName: "Michael", lastName: "Dudley",    birthdate: "08/28/1977", number: 7 }),
        new Player({ id: nextId(), teamId: 1, firstName: "Kevin",   lastName: "Baker",     birthdate: "02/02/1980", number: 3 }),
        new Player({ id: nextId(),            firstName: "Tim",     lastName: "Rayburn",   birthdate: "01/02/1976", number: 55 }),
        new Player({ id: nextId(), teamId: 5, firstName: "Glen",    lastName: "Donaldson", birthdate: "01/01/1976", number: 11 })
    ];

    Player.implement({
        get team() {
            var team = teams.find(team => {
                return this.teamId === team.id;
            });
            return (team)
                ? new Team(team.toData())
                : null;
        }
    });

    Team.implement({
        get roster() {
            return players.filter(player => {
                return this.id === player.teamId;
            });
        }
    });

    const TeamHandlerMock = CallbackHandler.extend(TeamFeature, {
        teams() {
            return Promise.resolve(teams);
        },
        team(id) {
            var team = teams.find(item => item.id == id);
            return Promise.resolve(new Team(team.toData()));
        },
        createTeam(team) {
            team.id = nextId();
            teams.push(team);
            return Promise.resolve(team);
        },
        deleteTeam(team) {},
        updateTeam(team) {
            let existing = teams.find(item => item.id === team.id);
            if (existing) {
                let result = existing.fromData(team);
            }
            return Promise.resolve(existing);
        },
        addPlayers(players, team) {
            players.forEach(player => player.teamId = team.id);
            return Promise.resolve();
        }
    });

    const PlayerHandlerMock = CallbackHandler.extend(PlayerFeature, {
        players() {
            return Promise.resolve(players);
        },
        player(id) {
            var player = players.find(item => item.id == id);
            return Promise.resolve(new Player(player.toData()));
        },
        createPlayer(player) {
            player.id = nextId();
            players.push(player);
            return Promise.resolve(player);
        },
        deletePlayer(player) {
        },
        updatePlayer(player) {
            let existing = players.find(item => item.id === player.id);
            if (existing) {
                let result = existing.fromData(player);
            }
            return Promise.resolve(existing);
        }
    });

    eval(this.exports);

};
