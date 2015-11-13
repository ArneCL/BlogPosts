title: PolymerJS: Sharing CSS styles across elements
tags: polymer,polymer-styles

If you want to share styles -- including Polymer's shim for CSS variables and its :host selector, etc  -- across multiple custom elements you need an *experimental* feature called CSS imports.

After ```dom-module``` include the tag ```<link rel="import" type="css" href="common.css">```. 

In the common.css file have your normal styles. Then voila.

Notes:

0. Polymer 1.1 has deprecated this method in favour of a [new one](https://blog.polymer-project.org/announcements/2015/08/13/1.1-release/).
0. If you want to include such polymer happy styles in your main document, index.html etc, just use a normal import that you'd use to import a custom element, with the ```<style is="custom-style">``` in such.

Full source an-ele.html:

    <link rel="import" href="bower_components/polymer/polymer.html">
    
    <dom-module id="an-ele">
    
        <link rel="import" type="css" href="common.css">    
        <template>  
            <span class="name">hi</span>
        </template> 
        <script>
            Polymer({
                is: "an-ele"
            }); 
        </script>
    
    </dom-module>

Full source common.css:

    :host {
        display: block;
        background-color: var(--an-ele-name-bgcolor, white);
    }
    :host.warning {
        background-color: var(--an-ele-name-bgcolor-warning, white);
    }

Full source index.html:

    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
            <link rel="import" href="bower_components/polymer/polymer.html">
            <link rel="import" href="an-ele.html">            
        </head>
        <body>
            <an-ele class="warning">
            </an-ele>
        </body>
    </html>
