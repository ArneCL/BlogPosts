title: PolymerJS: Communicating between elements
tags: polymer, polymer-communication, polymer-properties
date: Nov 13, 2015

We've [learnt](http://newfivefour.com/polymer-custom-element-properties.html) how to set custom properties on custom elements.

But we may want to communicate data between the host element and the custom element. We can use a property on the custom element for this.

In the host document, index.html in this case, we'll have a script tag that sets a property on a 'dom-bind' template called 'warning'.

    window.addEventListener('WebComponentsReady', function(e) { 
        var t = document.querySelector('#app');
        t.warning = true;
    });

Now in our template code in index.html we'll reference the `{{warning}}` property and also pass it to our custom element.

    <template id="app" is="dom-bind"><div>{{warning}}</div>
      <an-ele warning="{{warning}}" on-tap="clicky"></an-ele>
      ...
    </template>

Now in our custom element, set an ```on-tap``` event listener and change the value of 'warning' in that. 

    ...
    <template><div on-tap="clicky">hi</div>
    </template><script>
        Polymer({
            is: "an-ele",
            properties: {
                warning: {
                   type: "Boolean",
                   notify: true
                }
            },
            clicky: function() {
                this.warning = !this.warning;
            }
        });
    </script>
    ...

Note the `notify` property that's been added to the 'warning' property. This makes sure any changes to 'warning' in the element bubble up to the hosts, our template in index.html for example.

Now when we tap on the div in our custom element, the value in index.html will automatically update.

Note:

0. Although we're only communicating between index.html and the element, it's trivial to communicate between two elements -- in this case you'd just bind the 'warning' property to another custom element.

Full source: an-ele.html

    <link rel="import" href="bower_components/polymer/polymer.html">
    <dom-module id="an-ele">
        <template>
            <div on-tap="clicky">hi</div>
        </template>
        <script>
            Polymer({
                is: "an-ele",
                properties: {
                    warning: {
                       type: "Boolean",
                       notify: true
                    }
                },  
                clicky: function() {
                    this.warning = !this.warning;
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
                <div>{{warning}}</div>
                <an-ele  warning="{{warning}}"> </an-ele>
            </template>
        </body>
        <script>
           window.addEventListener('WebComponentsReady', function(e) { 
                var t = document.querySelector('#app');
                t.warning = true;
           });
        </script>
    </html>
