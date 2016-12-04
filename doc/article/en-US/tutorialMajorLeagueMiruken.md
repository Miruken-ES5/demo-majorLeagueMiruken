# Major League Miruken Tutorial
> 1st Draft

Major League Miruken is a reasonbly complex demo application written to 
show off the features of miruken and give us real code to discuss and 
work through as you learn Miruken.  Craig Neuwirt, Miruken's creator, is 
a huge soccer fan! When he is not working on Miruken or working with Miruken, 
he is playing soccer, and when he is not playing soccer he is coaching
his kids in soccer.  We really had no choice but to build a soccer application.

# Setup Your Environment
Before going throught this tutorial please set up your local environment
following the instruction found in
[Setting Up Your Environment ](environmentSetup.md).


## Frameworks and Tools
The point of this tutorial is to teach you how to use Miruken, but these
are some of the other frameworks we used to build Major League Miruken.
Miruken does not take a dependency on any othe these frameworks they 
just solve a problem in their particular space.

### Pug for Html
Tony Brown the UX designer from Improving who designed Major League Miruken
suggested we use Pug to write the Html.  I have to admit that I was sceptical.
I didn't want to add anything to this demo app that would cause confussion or
be a distraction to learning Miruken.  However, I have a lot of respect for
Tony and decided to give Pug a try. I have to say that writing Html is 
Pug is such a great experience.  Our views were half the size the were before.
Not having to write closing tags is very nice and mixins were a nice supprise.
We use and in line svg image for the jersey, and had it in multiple places.
Using a Pug mixin we were able to specify the jersey in 
one place `jersey.pug` and then mix it in where ever we needed it. Having to 
transpile Html turned out to be a none issue since we were already 
transpiling our javascript and css.

### Sass for Css
We chose to use Sass for the Css.  It give us the ability to use variables
in Css for example in `_module.scss` we created varaibles for the jersey
colors. If we want to change the colors, we have one place to change them.
The point of this demo is not to teach css, but I highly recommend you 
consider using Sass for you Css.

### Bootstrap for Css
Bootstrap is a nice css library.  It allows you to easily do page layouts
and gives resonable default styles.  Its pretty easily to make a nice looking
app with Bootstrap.  While Miruken doesn't depend on bootstrap, it can 
integrate with it making using Bootstrap modals easier. 
Any view can be shown as a modal simply by decorating the context when
calling the show method on the ViewRegion protocol.

```
return ViewRegion(this.io.modal({
    title:   "Select Your Players",
    buttons: [
        { text: "Ok",     css: "btn-sm btn-primary" },
        { text: "Cancel", css: "btn-sm", tag: -1 }
    ]
})).show("app/player/choosePlayer")
```

### Babel to transpile javascript
You don't have to use EcmaScript 2015 to use Miruken-ES5.  Infact we have
several apps in production written using EcmaScript 5.  Howerever, ES2015
added some really nice features to the language that makes code cleaner
and easier to understand.  Unfortunately, not all browsers fully support
ES2015 nativelly write now. So we are using babel to transpile our 
ES2015 to ES5.

### Gulp to run the build
Since, we are transpiling our html, js, and css we need a tool to organize 
our build.  Major League Miruken uses Gulp for this, and it works really well.
You could also do this with Grunt, bash, or Powershell.

### Karma, Mocha, Chai for Testing
Karma, Mocha, and Chai work really well together.  Karma is the test runner.
it allows you to executed the test in your browser of choice.  Mocha is the 
testing framework and Chai is an assertion library.

## Project Structure

### src
The **src** folder contains all the javascript, html, css, images, and the
index page for the application.  These files are then transpiled and copied
to the **built** folder.

### built
The **built** folder contains all the transpiles files.  The application
is serverd out of this folder during development.

### test
All of our tests files go in this folder.

### build
All of the gulp build tasks are inside the **build/tasks** folder.

## Domain
Lets start by looking at the files in `src/app/domain`.  One of the things
we try to do when writing an application is split out the core parts or you
application from anything related to the specific UI framework you are using.
The idea being that when your UI framework makes breaking changes, or you 
decided to change frameworks these parts of your code are unchanged.  So
for example this application is writen using Angular 1.x.x.  If we decide
to upgrade to Anuglar 2,  or Aurelia, or React.  We don't want to have to 
change our domain objects.

### Person
`person.js` is a great place for us to start. There are several key pieces of 
Miruken here in this file. The first thing you see starting on line 1, is 
that the entire file is wrapped in a function.  This function creates a
closure and keeps all of our code out of the global namespace. What we
want to do is put all of our code in a function and then execute it. There
are a couple of different ways to do this, but we like to use this syntax:
```
new function(){
    //code here
};
```

It is nice and clean. Much cleaner than the syntax that seems to be pervasive
today.  Most code examples on the internet use the 
Imediatly Invoked Fuction Expression(IIFE) syntax which accomplished the 
same thing, but doesn't look as ellegant and clean.
```
(function(){
    //code here
})();
```
Either one will work, but we prefere to new a function.  

#### Packages
The second thing you will notice is that we are creating a package at the 
top of this file.  We borrow some functionality from a library called 
**base2** that was written by Dean Edwards.  We don't use the whole library
just the package and object oriented pieces.  You see, contrary to popular 
belief we believe Javascript is one of the best object oriented languages
available today.  The problem is that the syntax to accomplish this is
pretty unfriendly out of the box.  That is where base2 comes in.  It gives
us an elegant and consistent syntax to create objects, namespaces,
and packages in Javascript.

Every Javascript file in the application follows this basic structure:
```
new function(){

    base2.package(this, {
        name   : "packageNameHere",
        imports: "other,packages,to,import",
        exports: "my,objects,to,export"
    });

    eval(this.imports);

    //code here

    eval(this.exports);

};
```

Create a base2 package. Give it a name.  Specify other packages that you 
want to import. Specify the members in this file that we want to export or
make available to other packages. Here is the one of the brilliant things
that base2 does for us:

    eval(this.imports);

What this does is import all the public members from the packages we 
listed in imports into our function scope.  This means they are ready and 
available to be used.

    eval(this.exports);

This exports the members we listed in exports list to be imported by 
other packages. To say it another way this makes the items in our export
list publicly available.

A more concrete example will be helpful at this point.

```
new function(){

    base2.package(this, {
        name   : "mlm",
        imports: "miruken.mvc,miruken.validate",
        exports: "Person"
    });

    eval(this.imports);

    const DATE_FORMAT = "MM/DD/YYYY";

    const Person = Model.extend({
        //code here
    });

    eval(this.exports);

};
```

In this example taken from person.js we are creating a package called **mlm**.
It stands for Major League Miruken, is kind of unique, and is short and 
easy to type.  We are importing code from the `miruken.mvc` package and also
the `miruken.validate` package.  You can import code from as many packages 
as you need. Just set imports equal to a comma seperte list.  

When we call `eval(this.imports)` all the members of these packages are 
available to us.  **Model** comes from miruken.mvc and we are extending
from Model to create our Person.  Person now inherits from Model and 
we gain quite a bit of functionality by inheriting from it.  We'll talk 
more about that later.

The last thing we want to do in each of our packages is
call `eval(this.exports)`.  In our example that will make Person publicly
available to other packages that want to use it.

At this point mlm is added to the global namespace.

    mlm.Person

Is available as is

    mlm.namespace

Now that you know all about packages, lets look at the Person object.

#### Models
Person extends from Model.  That means a person is a Model and as 
I said before you get lots of benefit from inheriting from model.  
One of my favorit benefits is mapping.  Models can construct themselves
from json objects. Which means I can do this:
```
const person = new Person({
    firstName: "Hari",
    lastName:  "Seldon"
});
```
Another thing you get from Model is validation. Miruken gives you validation
in your javascript objects where it belongs.  Objects can tell you if they
are valid and what is wrong so that you can display it to the user.  This is
very different from how Angular does validation.  They tie their validation
to the dom either through html or directives.  It is very easy for simple
validation, but gets very complex with validation spans multiple properties
not to mention multiple objects. Miruken give you validation at the 
property, object, and controller levels. With that much flexibility you 
can validate anything.

#### $properties

```
$properties: {
    id:        undefined,
    firstName: { validate: $required },
    lastName:  { validate: $required },
    birthdate: undefined
}
```
$properties are metadata about the properties of your object. To create 
a property all you need to do is add a member to the object literal
and Miruken will create the property on the object with an _ backing field.  
Here id will simply
create a property.  firstName and lastName create properties and  they
also add validation.  These properties are required.  When validation is
run on this object it will check that these properties are set.  
Birthdate is interesting because we are declaring it in $properties so 
that Miruken is aware of it, but it is a date and we know that dates 
usually require special attention.  We also add a specific getter and setter
for birthdate to only set the date if the value received is a valid date.

#### properties
The last important thing to point out here is that we also have properties 
that only have getters.  We are calculating the fullname of our person
based on the firstNam and lastName properties, and we are also calculating
the age for our person based on their birthdate.

### Player
Now lets look at the Player class.
```
new function(){

    base2.package(this, {
        name   : "mlm",
        imports: "miruken.mvc,miruken.validate",
        exports: "Player"
    });

    eval(this.imports);

    const Player = Person.extend({
        $properties: {
            number: {
                validate: {
                    presence: true,
                    numericality: {
                        onlyInteger: true,
                        greaterThanOrEqualTo: 0
                    }
                }
            },
            teamId: null,
            team:   { ignore: true }
        },

        $validateThat: {
            birthdateIsProvided(validation) {
                if (!this.birthdate) {
                    validation.results.addKey("birthdate").addError("presence");
                }
            }
        }
    });

    eval(this.exports);

};
```
You see at the very top of the file that
we are creating an mlm packages just like we did in person.  Player is also
eported into the mlm package.  This is an improvement Miruken made to base2.
We allow you to split your package definitions across multiple files.  This 
gives us more flexibitily in organizing our code.  You can still put multiple
classes in a file, but you can also split classes into seperate files
following the single responsibility principle.  That way your files only
have one reason to change.

Player inherits from Person by executing the extend method on Person and
passing in an object literal.  We define extra properties for the Player
in $properties.  Player has everything a Person has, and it adds number, 
teamId, and team properties.

Player number is a great example of property validation.  On Person we
used a very simple form of validation for firstName and lastName: 

    validate: $required

Is is actually a shortcut for:
```
validate: {
    presence: true
}
```

Here on Player number we have a more advanced validation senario:
```
number: {
    validate: {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: 0
        }
    }
}
```
`number` is required.  It must also be a number, an integer, and greater
thand or equal to 0;

Miruken uses [validate.js](https://validatejs.org/) to do property validation
so you should be able to use any validator it supports.

#### $validateThat
Since, we are talking about validation, notice that Player has a $validateThat
method:
```
$validateThat: {
    birthdateIsProvided(validation) {
        if (!this.birthdate) {
            validation.results.addKey("birthdate").addError("presence");
        }
    }
}
```
This is validation at the object level.  Often validation spans multiple 
properties, or it only applies to the object when the object is in a specific 
state.  Each method on the object literal becomes a validation for the object.
It is also easy to understand because it is self documenting.
$validateThat birthdayIsProvide reads like a sentence.

Each validation message is passed a validation object when it is called
by the framework.  Check anything about the property that needs to be checked
and if it fails, add a key and an error to the results collection of the 
validation.

These validations can be synchronous or asynchronous.  If you need to do
something asynchronous like make an http call just return a promise. When 
the promises are all resolved Miruken will return the results.

#### Model
The last thing I want to talk about in Player, is some functionality we
get from Model.  Remember Player inherits from Person, and Person inherits 
from Model.  So Player is a Model.  This means that it can take advantage of
all the features Model has to offer.  Remember earlier we said that Model
gives us some advance Mapping capabilities? We can new instances of models 
by giving them json objects and there are a couple of other features to 
models.  Models have a `.toData()` method that will create a JSON object
with just the $properties. It also has a `.fromData()` property that will
update the object when given a JSON object.

Notice this line of code in $properties:

    team:   { ignore: true }

Setting ignore to true tells the model to ignore this property when executing
`.toData()` and `.fromData()`.

This can be very helpful in controlling what data is sent back to the server
in a JSON request.

### Team
Team also extends from Model and there are some very powerful configurations
on its $properties.

```
const Team = Model.extend({
    $properties: {
        id:      null,
        name:    { validate: $required },
        color:   { map: Color },
        coach:   {
            map: Person,
            validate: {
                presence: true,
                nested:   true
            }
        },
        manager: {
            map: Person,
            validate: {
                presence: true,
                nested:   true
            }
        },
        roster:  {
            map:    Player,
            ignore: true
        }
    }
});
```
#### Mapping
`validate: $required` and `ignore: true` you have seen before, but map is 
a new concept.

    color: { map: Color }

Here we are saying that the color property should be mapped to a Color
Enum when the object is instantiated.

    manager: { map: Person } 

The manager should be mapped to a Person object.

    roster:  { map: Player }

Roster should be mapper to Player objects.  This one maybe surprising to you.
The mapping functionality in Model is smart enough to map a single object, 
and an array of objects.  Pass in a JSON array of players when instantiating
Team, and the mapper will automatically create an array of players and 
add them to your team.  

This is a huge time and code saver.  Before we added this functionality to 
Miruken we could easily write 50 to a 100 lines of code to map a JSON response
to domain objects.  Once we started using this approach we had the pleasure
of deleting hundreds of lines of mapping code.  When code start falling 
away like that, you know you are doing the right thing!

#### Nested Validation
The last thing I want to point out about Team is nested validation.
```
coach:   {
    map: Person,
    validate: {
        presence: true,
        nested:   true
    }
}
```
Notice that in validation we have `nested: true`.  This tells Miruken's
validation to validate the coach when it validates the Team.  We did the 
same thing for manager as well.  When validation is called on the Team
the entire object graph will be validate.  The team, the coach, and the manager
will all three be validated and will be able to tell you what is wrong
with them if they fail validation.

### Color
The last object we want to talk about in the domain, is the Color enum:
```
const Color = Enum({
    black:     "black",
    blue:      "blue",
    green:     "green",
    lightBlue: "lightBlue",
    maroon:    "maroon",
    orange:    "orange",
    red:       "red",
    white:     "white",
    yellow:    "yellow"
});
```
Javascript does not have an Enum implementation, so Miruken has provided
one for us.  You could just use an object literal to represent your enum,
but Mirukens Enum has some handy features.  First, you can an array of 
all the names from an enum:

    Color.name = ["black", "blue" "green"...];

Second, you can get all the values from an enum:

    Color.value = ["black", "blue" "green"...];

Third, Enums are immutable which means there values cannot be altered 
accidently in code.  There are other features such as logical operations, 
and toJSON, but we won't go in depth on those here.

## boostrap.js

## Features
When we write applications we always organize our code with feature folders.
All the files related to a feature are grouped together in a folder.  This 
works much better than grouping files by type especially as the application
gets more features.  Major League Miruken has two features: players and teams.

### Team Feature
If you look in `src/app/team` you will find all the files releated to the 
team feature.

### Player Feature

## protocol

## mock handlers

## Angular Directives

## Enum
