title: PolymerJS: Event retargeting in Polymer 1.0
tags: polymer,polymer-events

Event retargeting makes an event from a custom element look like it's coming from the overall custom element tag, as opposed to an element within.

For example:

    <dom-module id="an-ele">
        <template>
            <span on-click="clicky">hi</span>
        </template> 
    ...
    
An event from the span tag would be retargeted to come from the 'an-ele' tag when it bubbles up to a parent listener.

Event retargeting was part of ShadowDOM. But the more performant ShadyDOM -- the default in 1.0 -- does not have this.

But ```Polymer.dom(e).localTarget``` will retarget an event object for you to the overall tag.

Given a custom element in index.html which has a ```on-tap``` listener, this method on the dom-bind template will give you to retargeted event:
    
    t.clicky= function(e) {
        var t = Polymer.dom(e);
        console.log("retargeted:", t);
        console.log("normal:", e);
    }

Giving the output:

    retargeted: Polymer.EventApi.EventApi {event: (...), rootTarget: (...), localTarget: (...), path: (...)}
    normal: CustomEvent {detail: Object, ....
    
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
                <an-ele on-tap="clicky">
                </an-ele>
            </template>
        </body>
        <script>
          var t = document.querySelector('#app');
          t.clicky= function(e) {
              console.log("retargeted:", Polymer.dom(e));
              console.log("normal:", e);
          };
        </script>
    </html>

Full source: an-ele.html

    <link rel="import" href="bower_components/polymer/polymer.html">
    
    <dom-module id="an-ele">
        <template>
            <span>hi</span>
        </template>
        <script>
            Polymer({
                is: "an-ele"
            });
        </script>    
    </dom-module>
