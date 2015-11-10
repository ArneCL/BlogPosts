title: PolymerJS: Style the host of a custom element
tags: polymer, polymer-styles

Once you've got a custom element, you may want to style the host tag. That is, ```<an-ele>``` in our previous examples.

We can do this via the ```<style>``` tag in our custom element using the ```:host``` CSS selector.

    <style>
        :host {
            display: block;
            border: 1px solid black;
        }
    </style>

Notes:

0. Again, run this from a local server, not the index.html file directly.

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
        <style>
            :host {
                display: block;
                border: 1px solid black;
            }   
        </style>    
        <template>  
            <div> 
                Some stuff
            </div>  
        </template>     
        <script>    
            Polymer({
                is: "an-ele"
            });
        </script>
    </dom-module>
