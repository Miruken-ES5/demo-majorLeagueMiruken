const fs = require("fs");

const appRoot = "src/";
const pkg     = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

const paths   = {
  root       : appRoot,
  source     : [
    appRoot + "app/bootstrap.js",
    appRoot + "app/domain/**/*.js",
    appRoot + "app/team/teamFeature.js",
    appRoot + "app/player/playerFeature.js",
    appRoot + "app/team/colorStyleMixin.js",
    appRoot + "app/team/teamsController.js",
    appRoot + "app/team/teamController.js",
    appRoot + "app/team/createTeamController.js",
    appRoot + "app/team/editTeamController.js",
    appRoot + "app/team/teamHandler.js",
    appRoot + "app/player/playersController.js",
    appRoot + "app/player/playerController.js",
    appRoot + "app/player/createPlayerController.js",
    appRoot + "app/player/editPlayerController.js",
    appRoot + "app/player/choosePlayerController.js",
    appRoot + "app/player/playerHandler.js",
    appRoot + "app/player/**/*.js",
    appRoot + "app/env/mock/handlerMocks.js",
    appRoot + "app/env/mock/setup.js",
    appRoot + "**/*.js"
  ],
  html            : appRoot + "**/*.pug",
  cssSource      : "bower_components/bootstrap-additions/dist/**/*.css",
  cssDest        : "styles/bootstrap-additions",
  style           : appRoot + "styles/**/*.scss",
  index           : appRoot + "index.pug",
  built           : "built/",
  dist            : "dist/",
  packageName     : pkg.name,
  ignore          : []
};

paths.files = [
  paths.source
];

module.exports = paths;
