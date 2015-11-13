title: Binding properties to DOM attributes & styling with such
tags: polymer, polymer-styles, polymer-properties

We saw [previously](http://blog.denevell.org/polymer-custom-element-properties.html) that we could set a custom element's property and have that value changed in the DOM.

In that case, we set a boolean and `<span>{{warning}}</span>` changed. That is, the DOM changed.

However, if we want to bind a variable to an attribute, `<div warning="{{warning}}">hi</div>`, then the DOM won't automatically change when the property does, although the underlining javascript value will.

So we have to use the `<div warning$="{{warning}}">hi</div>` syntax instead to change the DOM attribute. If we combine this with some CSS selectors, we can use it to style the element.

    div {
        background-color: pink;
    }
    div[warning] {
        background-color: red;
    }

Notes:

0. If you open up the DOM inspector, you can see the attribute change when the property does, in the example below.

Full source: an-ele.html

    <link rel="import" href="bower_components/polymer/polymer.html">
    <dom-module id="an-ele">   
        <style>
            div {
                background-color: pink;
            }
            [warning] {
                background-color: red;
            }
        </style>
        <template>
            <div warning$="{{warning}}">hi</div>
        </template>
        <script>
            Polymer({
                is: "an-ele",
                properties: {
                    warning: {
                       type: "Boolean"
                    }
                }
            });
        </script>
    </dom-module>

Full source: index.html

    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
            <link rel="import" href="bower_components/polymer/polymer.html">
            <link rel="import" href="an-ele.html">
        </head>
        <body>    
            <template id="app" is="dom-bind">
                <an-ele warning="{{warning}}" on-tap="clicky">
                </an-ele>
            </template>
        </body>
        <script>
           window.addEventListener('WebComponentsReady', function(e) { 
                var t = document.querySelector('#app');
                t.clicky= function(e) {                
                   var t = Polymer.dom(e).localTarget;
                   t.warning = !t.warning;
                };
           }
        </script>
    </html>
