title: PolymerJS: Getting setup
tags: polymer, polymer1.2, polymer-setupp

To download Polymer, its dependencies and such, use [bower](http://bower.io/#install-bower), then, in a new directory, type in the command line ```bower init```. (You can press enter -- except for the name -- at all the prompts if you want.)

    $ bower init ? 
    name: somename ? 
    version: 0.0.0 
    ... ? 
    Looks good? Yes


Next run ```bower install --save Polymer/polymer#^1.2.0``` which will pull the latest Polymer 1.2 minor version, its dependencies, and place them all in a directory called bower_components. 

Now let's create an index.html.
     
        <html> 
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
            <link rel="import" href="bower_components/polymer/polymer.html">
          </head>
          <body> 
            This does nothing at the moment, except pull in webcomponents and polymer. 
          </body> 
        </html>

And we are, at least, setup, if not actually using polymer as yet.
