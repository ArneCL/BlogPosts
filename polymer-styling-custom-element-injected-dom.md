title: PolymerJS: Styling a custom element's injected DOM
tags: polymer, polymer-styles

We've [learnt](http://blog.denevell.org/polymer-inject-dom-into-custom-element.html) how to inject DOM into a custom element. And we know how to style the overall host element.

If we want to style the injected nodes in that custom tag, we can use the ```::content``` CSS selector in the custom element.

For example, if we want to style the ```<desc>``` tag below:

    <an-ele>
      <name>Yo</name>
      <desc>So.... hi....</desc>
    </an-ele>

Then in the style tag in the custom element, we'd use the ```::content``` selector

    :host ::content desc {
        color: yellow;
    }  
  
Note we're selecting the desc tag within the content of the custom element.

We also specify the ```:host``` tag -- or a wrapper element around the ```<content>``` tag in the custom element's local dom -- otherwise the style will apply to the whole document.

This is because in ShadyDOM -- which is used per default for performance reasons -- the ::content specifier is removed. So by specify :host or a wrapper class, it'll be encapsulated to the custom element.

Full source: index.html

    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
            <link rel="import" href="bower_components/polymer/polymer.html">
            <link rel="import" href="an-ele.html">
        </head>
        <body>
            <an-ele>
                <name>Yo</name>
                <desc>So.... hi....</desc>
            </an-ele>
        </body>
    </html

Full source: an-ele.html

<link rel="import" href="bower_components/polymer/polymer.html">

    <dom-module id="an-ele">
    
        <style>
            :host ::content desc {
                color: yellow;
            }   
        </style>
        <template>
            <div> 
                Name: <content select='name'></content><br>
                Desc: <content select='desc'></content>
            </div>  
        </template>
        <script>
            Polymer({
                is: "an-ele"
            });
        </script>
    
    </dom-module>
