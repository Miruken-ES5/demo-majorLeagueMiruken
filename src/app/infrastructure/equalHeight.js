new function() {

    base2.package(this, {
        name:    "mlm",
        imports: "miruken.ng",
        exports: "EqualHeight"
    });

    eval(this.imports);
    
    const EqualHeight = Directive.extend({
        restrict: "A",
        link(scope, elm) {
            scope.$watch(function () {
                angular.element(elm).find('.js-equal-height').matchHeight({
                    property: "min-height"                            
                });
            }, Undefined);
        }
    });

    eval(this.exports);

};
