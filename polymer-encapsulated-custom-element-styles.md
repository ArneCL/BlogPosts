title: PolymerJS: Encapsulated custom element styles
tags: polymer, polymer-styles

In the last [example](http://blog.denevell.org/polymer-create-simple-custom-element.html) we created a simple custom component.

Within the ```dom-module```, we can include a ```style``` element. This will style the DOM in the custom component -- nothing outside the custom component.

Take this example:

    <dom-module id="an-ele">
        ...
        <style>
            div {
                background-color: red
            }
        </style>
        <template>
            <div>
                Sup
            </div>
        </template>
        ...
    </dom-module>

The ```div``` in ```an-ele``` will be given a red background. But any div outside the custom component will remain unstyled. For example, in index.html:

    <an-ele></an-ele>
    <div>hiya</div>

The 'hiya' div will not be given a red background, but the div within the ```an-ele``` component will do.

Notes:

0. Again, we need to run this from a local server, not the file directly.

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
            <div>hiya</div>
        </body>
    </html>

Full source: an-ele.html

    <link rel="import" href="bower_components/polymer/polymer.html">

    <dom-module id="an-ele">

        <style>
            div {
                background-color: red
            }
        </style>
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
