new function(){

    mlm.package(this, {
        name   : "team",
        imports: "miruken",
        exports: "ColorStyleMixin"
    });

    eval(this.imports);

    const ColorStyleMixin = Module.extend({
        getColorButtonStyle(object, color){
                return object.team.color == color
                ? [color.toString(), 'active']
                : [color.toString()];
        }
    });
    
    eval(this.exports);
};
