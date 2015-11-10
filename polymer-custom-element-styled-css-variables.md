title: PolymerJS: Allow custom elements to be styled with CSS variables
tags: polymer, polymer-styles

After we created a [custom element](http://blog.denevell.org/polymer-simple-template-binding.html), we learnt how to encapsulate its styles, style its host element and style its injected content.

But a custom element owner should specify what internal styles should be specified by the user.

PolymerJS 1.0 uses a basic shim for CSS variables for this.

In the element's local DOM, you'd surround your content in a tag with a class name ```<span class="aclass">styled content</span>``` for example.

Then in the style tag above the template, you'd specify that class, ```aclass``` in this case, with something like ```background-color: var(--an-ele-bgname, pink)```.

The above says there'll be a variable called ```--an-ele-bgname``` that should be used for the background-color of the class, or use pink if it doesn't exist.

Then in your index.html, ensure the style tag is extended by an ```is="custom-style"```, ensure the css selector that specifies our custom element specifies the CSS var named above:

    <style is="custom-style">
        an-ele {
            --an-ele-bgname: red;
        }
    </style>

Notes:

0. If you specify the custom element from within another custom element, you don't need to extend style with ```is="custom=style"```.

Full source: index.html

    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
            <link rel="import" href="bower_components/polymer/polymer.html">
            <link rel="import" href="an-ele.html">
            <style is="custom-style">
                an-ele {
                    --an-ele-bgname: red;
                }
                .name {
                    color: yellow;
                }
            </style>
        </head>
        <body>
            <an-ele>
            </an-ele>
        </body>
    </html>

Full source: an-ele.html

    <link rel="import" href="bower_components/polymer/polymer.html">
    
    <dom-module id="an-ele">
        <style>
            .name {
                display: block;
                background-color: var(--an-ele-bgname, pink);
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
