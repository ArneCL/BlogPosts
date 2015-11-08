title: PolymerJS: Creating a simple custom element
tags: polymer, polymer-element

We can have a lot of fun with Polymer within a ```dom-bind``` template in index.html. 

But we really want to use custom elements in separate files to compartmentalise our web app.

First create a file called 'an-ele.html'. Note the custom element must have a dash in the name, as per the spec.

Within that file, put an HTML import at the top, importing Polymer. If it's already been imported, the HTML import will ignore it.

Then create a ```dom-module``` tag with an ```id``` as the same name as the file.

    <link rel="import" href="bower_components/polymer/polymer.html">
    <dom-module id="an-ele">
       ...
    </dom-module>
    
Within the dom-module, we need three things

0. a ```template``` tag which includes the local DOM content.
1. a ```script``` tag that initialises the Polymer element
2. an optional ```style``` tag that has encapsulated styles for the component.

The content within ```<dom-module>``` will look like this:

    <template>
        <div> 
            Sup
        </div>
    </template>
    <script>
        Polymer({
            is: "an-ele"
        });
    </script>

The Polymer ```is``` attribute must be the same name as the file and the id on the ```dom-module```. Other polymer stuff will be here eventually.

Now we've defined our custom component, we can import it in ```index.html``` using ```<link rel="import" href="an-ele.html">``` and then simply use it anywhere in the file using ```<an-ele></an-ele>```.

Notes:

0. Again, run this example from a local server, apache or through python's local server, etc.

Full source: index.html

    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
            <link rel="import" href="bower_components/polymer/polymer.html">
            <link rel="import" href="an-ele.html">
        </head>
        <body>
            <an-ele></an-ele>
        </body>
    </html>

Full source: an-ele.html

    <link rel="import" href="bower_components/polymer/polymer.html">

    <dom-module id="an-ele">
        <template>
            <div> 
                Sup
            </div>
        </template>
        <script>
            Polymer({
                is: "an-ele"
            });
        </script>

    </dom-module>
