new function() {

    base2.package(this, {
        name:    "mlm",
        imports: "miruken.ng,miruken.mvc,miruken.ioc",
        exports: "Bootstrap",
        ngModule: [
            "ui.router",
            "ngMessages",
            "localytics.directives",
            "mgcrea.ngStrap",
            "mgcrea.ngStrap.helpers.dimensions",
            "mgcrea.ngStrap.tooltip",
            "mgcrea.ngStrap.helpers.dateParser"
        ]
    });

    eval(this.imports);

    const Bootstrap = Installer.extend({
        $inject: ["$urlRouterProvider", "$stateProvider"],
        constructor($urlRouterProvider, $stateProvider) {
            $stateProvider
                .state(UiRouter.install("mvc"))
                .state("mvc.default-id",
                       UiRouter.route("/{controller}/{action}/{id}"))
                .state("mvc.default",
                       UiRouter.route("/{controller}/{action}"));

            $urlRouterProvider.otherwise("/teams/showteams");

            Controller.prepare.push(function (handler) {
                return handler.$recover();  // handle common error scenarios
            });

            Controller.execute.push(function (handler) {
                return handler.$ngApplyAsync();  // ensure $digest loop runs
            });
        }
    });

    moment.fn.toJSON   = function() { return this.format("L"); };
    moment.fn.toString = function() { return this.format("L"); };

    eval(this.exports);

};
