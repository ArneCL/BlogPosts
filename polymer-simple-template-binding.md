title: PolymerJS: Very simple template binding
tags: polymer, polymer-binding

The ```template``` element is a dumb "do not add this to the dom (until I say so)" element. It's in the web component spec, and widly supported.

But PolymerJS's templating binding allows you to show that template using bound data, using PolymerJS's ```dom-bind``` web component in this simple case.

Although template binding is normally limited to PolymerJS elements, ```dom-bind``` allows you to do it inside index.html.

So, inside the ```body``` element, we'll have this text:

    <template id="app" is="dom-bind">
        {{something}}
    </template>

We have a ```template``` element which has the ```is``` attribute telling us it's an extension to a *inbuild* element.  In this case, an extension called ```dom-bind```, allowing us to use template binding in index.html.

Next, we need some javascript:

     window.addEventListener('WebComponentsReady', function(e) {
            document.querySelector('#app').something = "yo";
     });

This is waiting for a ```WebComponentsReady``` event to say everything is ready, then setting a property on the 'dom-bind' template, which is then shown in the template, in boldface.

Notes:

0. The ```{{}}``` syntax with the template element must 1) have a name with no whitespace around it and 2) be enclosed in an element. ```<span>{{nowhitespace}}<span>``` for example. Since 1.2 you have do ``<span>{{blar}} {{blar1}}</span>``.
1. The ```is``` attribute is only needed when a web component, ```dom-bind``` in this case, extends an inbuild element like template, table, etc. If it doesn't you can do something like ```<my-element ...>```

Full index.html

    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
            <link rel="import" href="bower_components/polymer/polymer.html">
        </head>
        <body>
            <template id="app" is="dom-bind">
                <b>{{something}}</b>
            </template>
        </body>
        <script>
           window.addEventListener('WebComponentsReady', function(e) {
                document.querySelector('#app').something= "yo";
           });
        </script>
    </html>
