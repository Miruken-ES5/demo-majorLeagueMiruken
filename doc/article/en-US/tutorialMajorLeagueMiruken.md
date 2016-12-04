# Major League Miruken Tutorial

## Setup Your Environment

### Mac

### Windows

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

### Packages
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

### Models
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


## Features
When we write applications we always organize our code with feature folders.
All the files related to a feature are grouped together in a folder.  This 
works much better than grouping files by type especially as the application
gets more features.  Major League Miruken has two features: players and teams.

### Team Feature
If you look in `src/app/team` you will find all the files releated to the 
team feature.

#### playerFeature.js

### Player Feature

## boostrap.js

## protocol

## mock handlers

## Angular Directives

## Enum
