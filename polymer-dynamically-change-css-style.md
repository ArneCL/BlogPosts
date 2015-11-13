title: PolymerJS: Dynamically changing a CSS style
tags: polymer, polymer-styles

<p>[Previously](http://blog.denevell.org/polymer-custom-element-styled-css-variables.html), we learnt how to use the shimmed CSS variables to style a custom element.

We may want to change that dynamically. And we can by using the ```customStyle``` property on the custom element.

Say we have a click listener on our element, and we want to change its ```'--an-ele-name-bgcolor'``` CSS variable.

We can get access to such property from the element (likely using event [retargeting](http://blog.denevell.org/polymer-event-retargeting.html)) and change the style like so.

    t.clicked = function(e) {
       var tar = Polymer.dom(e).localTarget;
       tar.customStyle['--an-ele-name-bgcolor'] = 'pink';
       tar.updateStyles();
    };

For performance reasons, we have to call updateStyles on our component ourself.

Notes:

0. We can also dynamically alter the varibles in a [CSS mixin](http://polymerjs.newfivefour.com/post/126529902517/allow-custom-elements-to-be-styled-many-rules), but only with [obliterating any CSS you don't respecify](https://github.com/Polymer/polymer/issues/2268) from what I can tell at the moment. 

Full source: index.html

    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
            <link rel="import" href="bower_components/polymer/polymer.html">
            <link rel="import" href="an-ele.html">
            <style is="custom-style">
                    --an-ele-name-bgcolor: purple;
                }
            </style>
        </head>
        <body>    
            <template id="app" is="dom-bind">
                <an-ele on-tap="clicked">
                </an-ele>
            </template>
        </body>
        <script>
           window.addEventListener('WebComponentsReady', function(e) { 
                var t = document.querySelector('#app');
                t.clicked= function(e) {
                   var t = Polymer.dom(e).localTarget;
                    t.customStyle['--an-ele-name-bgcolor'] = 'pink';
                    t.updateStyles();
                };
           });
        </script>
    </html>

Full source: an-ele.html

    <link rel="import" href="bower_components/polymer/polymer.html">
    
    <dom-module id="an-ele">
    
        <style>
            .name {
                background-color: var(--an-ele-name-bgcolor, green);
            }
        </style>
        <template>
            <span class="name">hi</span>
        </template>
        <script>
            Polymer({
                is: "an-ele"
            });
        </script>
    
    </dom-module>
