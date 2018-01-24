title: Javascript: Dynamically load a new script
tags: javascript

There are plenty of ways to do this but this is the simplest:

Go to the javascript console in your browser and type:

```
var script = document.createElement("script"); 
script.src = "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.js"
document.head.appendChild(script)
```

You have now loaded Mustache.js into the browser. Let's use it:

```
Mustache.render("hi {{name}}!", { name: "dave" });
```

It will render `hi dave!` in the console.
