const paths       = require("../paths");
const gulp        = require("gulp");
const browserSync = require("browser-sync");
const reload      = browserSync.reload;
const watch       = require("gulp-watch");
const batch       = require("gulp-batch");

gulp.task("serve", ["build"], () => {
    browserSync({
        notify: false,
        port: 9100,
        server: {
            baseDir: paths.built,
            routes: {
                "/bower_components": "bower_components",
                "/node_modules":     "node_modules",
                "/jspm_packages":    "jspm_packages",
                "/config.js":        "config.js"
            }
        }
    });

    watch([
        paths.built + "**/*.html",
        paths.built + "**/*.js",
        paths.built + "**/*.css",
        paths.built + "images/**/*"
    ], batch((events, done) => {
        reload();
        done();
    }));

});

