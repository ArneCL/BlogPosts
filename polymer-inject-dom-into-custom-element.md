title: Injecting DOM into a custom element
tags: polymer, polymer-localdom

We [previously](http://blog.denevell.org/polymer-create-simple-custom-element.html) created a simple custom element.

We can also inject DOM from our index.html into that element.

In our index.html, modify our ```an-ele``` to have some new tags with content within, ensuring such tags aren't title or anything that may clash with existing HTML tags.

    <an-ele>
        <name>Yo</name>
        <desc>So.... hi....</desc>
    </an-ele>

Now in our an-ele.html we can use the ```<content>``` tags with a ```select``` attribute that takes in CSS selectors to select content.

    <template>
        <div>   
            Name: <content select="name"></content><br>
            Desc: <content select="desc"></content>
        </div>
    </template>             

Notes:

0. Again, ensure you're running this from a local server, not index.html directly.

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
    </html>

Full source: an-ele.html

    <link rel="import" href="bower_components/polymer/polymer.html">

    <dom-module id="an-ele">
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
