new function(){

    base2.package(this, {
        name   : "mlm",
        imports: "miruken.mvc,miruken.validate",
        exports: "Person"
    });

    eval(this.imports);

    const DATE_FORMAT = "MM/DD/YYYY";

    const Person = Model.extend({
        $properties: {
            id:        undefined,
            firstName: { validate: $required },
            lastName:  { validate: $required },
            birthdate: undefined
        },

        get fullName() {
            if(!this.firstName && !this.lastName) return null;
                return `${this.firstName || ""} ${this.lastName || ""}`;
            },
        get age() {
            if(!this.birthdate) return null;
                const years =  moment().diff(moment(this.birthdate, DATE_FORMAT), "years");
                return years >= 0
                    ? years
                    : null;
        },
        get birthdate(){
            return this._birthdate;
        },
        set birthdate(value) {
            if(value) {
                var selected = moment(value, DATE_FORMAT);
                if(selected.isValid()){
                    this._birthdate = selected.format(DATE_FORMAT);
                }
                return;
            } else {
                this._birthdate = value;
            }
        }
    });

    eval(this.exports);

};
