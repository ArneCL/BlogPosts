title: PolymerJS: Custom element properties
tags: polymer, polymer-properties

[Previously](http://blog.denevell.org/polymer-simple-template-binding.html), we set javascript properties to be bound a template that extends ```dom-bind```.

We now want to do the same to a custom element. So we need to specify the properties in the initialisation code.

    Polymer({
        is: "an-ele",
        properties: {
            warning: {
               type: "Boolean"
            }
        },
    });

This specifies there'll be a property on the element. There are other properties to set for the 'warning' property, but we'll leave them for now.

In our template for the element, we can now reference the property.

    <template>
      <span>{{warning}}</span>
    </template>

Now, outside the element, if we change the property, i.e. ```document.querySelector('an-ele').warning = false```, it will show change the displayed true or false in the template.

Full source: an-ele.html

    <link rel="import" href="bower_components/polymer/polymer.html">
    
    <dom-module id="an-ele">
    
        <template>
            <span>{{warning}}</span>
        </template>
        <script>
            Polymer({
                is: "an-ele",
                properties: {
                    warning: {
                       type: "Boolean"
                    }
                },
            });
        </script>
    
    </dom-module>

Full source: index.html

    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
            <link rel="import" href="an-ele.html">
        </head>
        <body>
            <template id="app" is="dom-bind">
                <an-ele warning="false" on-tap="clicky">
                </an-ele>
            </template>
        </body>
        <script>
           window.addEventListener('WebComponentsReady', function(e) { 
                var t = document.querySelector('#app');
                t.clicky= function(e) {
                   var t = Polymer.dom(e).localTarget;
                    if(t.warning) {
                        t.warning = false;
                    } else {
                        t.warning = true;
                    }
                };
           });
        </script>
    </html>
