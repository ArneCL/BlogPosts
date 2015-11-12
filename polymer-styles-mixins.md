title: PolymerJS: Allow custom elements to be styled: many rules with mixins
tags: polymer,polymer-styles

[Previously](http://blog.denevell.org/polymer-custom-element-styled-css-variables.html), we showed how one CSS property in your custom element could be styled from the outside using a shim for CSS variables.

But we often want to allow the user to style not just one rule for a class, not even many, but anything for that class. 

Polymer 1.0 uses an *experimental* feature called **mixins** that allows the element user to specify any CSS property for a class.

We ```@apply(--an-ele-name-theme)``` in CSS selector for the class in the custom element:

    <dom-module id="an-ele"><style>
            .name {
                @apply(--an-ele-name-theme);
            }
        </style>
    ...
    
Then in the index.html, or hosting custom element, we specify the ```--an-ele-name-theme``` under the selector for our element, and add the styles there.

    <style is="custom-style">
        an-ele {
            --an-ele-name-theme: {
                display: block;
                color: white;
                font-weight: bold;
                background-color: blue;
            };
        }
    </style>

Notes:

0. ```is="custom-style"``` is only needed if your styling the element from index.html not a polymer element.

Full source: an-ele.html

    <link rel="import" href="bower_components/polymer/polymer.html">
    
    <dom-module id="an-ele">
    
        <style>
            .name {
                @apply(--an-ele-name-theme);
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
    
Full source: index.html

    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
            <link rel="import" href="bower_components/polymer/polymer.html">
            <link rel="import" href="an-ele.html">            
            <style is="custom-style">
                an-ele {
                    --an-ele-name-theme: {
                        display: block;
                        color: white;
                        font-weight: bold;
                        background-color: blue;
                    };
                }
            </style>
        </head>
        <body>
            <an-ele>
            </an-ele>
        </body>
    </html>
