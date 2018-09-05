title: Javascript: Create HTML with Javascript
tags: javascript,html

If you create HTML with javascript you can

* Insert variables that are available in Javascript
* Add event listeners which close over javascript variables (i.e. you can use closures as event handlers)

The first user case is handled by the new template literals. The second usecase is not. Although there are tricks around that but this post is not about that.

We want to be able to do 

```
node("div")
node("div", "background-color: red")
node("div", "background-color: red", ["id", "an_id", "class", "something", "attribute", "value"])
```

With everything but the tag name optional. For example `node("div", ["id", "hiya"])` is valid as is `node("span")`.

We also want to add child nodes as a single node or an array of nodes or a mixture. These come after the tag name, optional style and optional attributes.

```
node("div",
  node("div")
)
node("div",
  node("div"),
  node("div")
)
node("div",
  [node("div"), node("div")]
)

node("div",
  node("div"),
  [node("div"), node("div")],
  node("div")
)
```

In addition we want to be able to optionally add event listeners. These come after the tag name, optional style and optional attributes.

```
node("div", 
  ["click", (event) => console.log("click"),
   "focus", (event) => console.log("focus")]
)
```

And it's annoying to type `node("div")` and not `div()` so let's fix that now.

```
function div() { 
  return node.apply(this, ["div"].concat([...arguments]))
}
function span() { 
  return node.apply(this, ["span"].concat([...arguments]))
}
etc...
```

Plus we need this for text

```
function text(str) {
  return document.createTextNode(str)
}
```

Finally here's the function that does all that:

```
function node() {
  var iterator = 0;
  var h = document.createElement(arguments[iterator++])
  if(arguments[iterator] && typeof(arguments[iterator]) === "string") h.style = arguments[iterator++];
  if(arguments[iterator] && arguments[iterator] instanceof Array
    && typeof(arguments[iterator][1]) === "string") {
    for(var i=0; i<arguments[iterator].length;) {
      h.setAttribute(arguments[iterator][i++], arguments[iterator][i++])
    }
    iterator++
  }
  if(arguments[iterator])
  for(var i = iterator; i < arguments.length; i++) {
    if(arguments[i] instanceof Array) {
      if(arguments[i][1] instanceof Function) {
        for(var j = 0; j < arguments[i].length; ) {
          h.addEventListener(arguments[i][j++], arguments[i][j++])
        }
      } else {
        arguments[i].forEach(node => h.appendChild(node))
      }
    } else {
      h.appendChild(arguments[i])
    }
  }
  return h
}
```

```
div(
  h4("color: blue", 
    text("click me"),
    ["click", () => alert("end of blog post")]
  )
)
```

(the caveat of using a text node is that you /need/ to use a style string else it will confuse the function)
