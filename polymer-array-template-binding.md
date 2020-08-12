title: PolymerJS: Array Template binding
tags: polymer, polymer-binding
date: Nov 8, 2015

After introducing [template binding](http://blog.denevell.org/polymer-simple-template-binding.html), we'll now look at repeating elements in an array.

This is done via another extension to a template called ```dom-repeat```, which takes an ```items``` attribute naming the property to which we want to bind.

    <template  is="dom-repeat" items="{{weather}}">
        <span>{{index}}</span> <span>{{item.dt_txt}}</span>:
        <b>{{item.weather.0.description}}</b> <br>
    </template>

Inside the 'dom-repeat' template, we have ```{{index}}``` and ```{{item}}``` which refer to the numerial index and the element in the bound array. If we want to access array elements, we use ```.5.``` not ```[5]```.

The javascript is nearly exactly as before, but this time we'll set an array as a property. For "fun", we'll synchronously get the weather for sunny, sunny Manchester. 

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=Manchester&mode=json", false);
    xhr.send();
    document.querySelector('#app').weather = JSON.parse(xhr.response).list;

Notes:

0. Ensure you run this from a local server, apache or python etc, not the local file directly.
1. If you want to rename ```{{index}}``` and ```{{item}}```, which is useful for dom-repeat's within dom-repeats, you can use the ``as`` and ``index-as`` attributes
1. Remember we still need to embed everything in a ```dom-bind``` so we can do this from outside a web component.
2. Synchronous XMLHTTPRequests are bad, baaad.

Full index.html;

    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
            <link rel="import" href="bower_components/polymer/polymer.html">
        </head>
        <body>
            <template id="app" is="dom-bind">
                <template  is="dom-repeat" items="{{weather}}">
                    <span>{{index}}</span> <span>{{item.dt_txt}}</span>: 
                    <b>{{item.weather.0.description}}</b> <br>
                </template>
            </template>
        </body>
        <script>
           window.addEventListener('WebComponentsReady', function(e) { 
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=Manchester&mode=json", false);
                xhr.send();
                document.querySelector('#app').weather = JSON.parse(xhr.response).list;
           });
        </script>
    </html>
