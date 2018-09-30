title: Javascript: Passing the dom node to our event listener
tags: javascript

Previously (https://newfivefour.com/javascript-css-loading-button.html) we had this:

```
div("position: relative", 
  div("position: absolute;", ["class", "spinner"]),
  button(text("Search")),
  ["click", e => fetchData(e.target.parentNode.previousSibling.value)]
),
```

If you look at our event listener we're traversing the dom using parentNode and previousSibling.

This is because the click event will come from the `button`, and so even thought we're on the outer div in our listener, `event.target` will still point to the button that was clicked.

This is a problem because we won't exactly know what target will relate to when we update this DOM in the future.

A better solution is to give this click listener a reference to it own DOM element (`div("position: relative")`) in our case. 

We can modify our `node` (therefore `div` etc) to give it so with this new code:

```
var name = arguments[i][j++]
var clicker = arguments[i][j++]
h.addEventListener(name, e => clicker(e, h))
```

Where `h` refers to the current dom node. Our modified `node()` method looks like this now:

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
    if(arguments[i] instanceof Function) arguments[i](h)
    else if(arguments[i] instanceof Array) {
      if(arguments[i][1] instanceof Function) {
        for(var j = 0; j < arguments[i].length; ) {
          var name = arguments[i][j++]
          var clicker = arguments[i][j++]
          h.addEventListener(name, e => clicker(e, h))
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

With all our `div` etc helper method we can now do this:

```
div("display: flex; flex-direction: column; align-items: flex-start;",
  input(["placeholder", "Input: lon, man, liv, etc"]),
  div("position: relative", 
    div("position: absolute;", ["class", "spinner"]),
    button(text("Search")),
    ["click", (e, node) => fetchData(node.previousSibling.value)]
  ),
)
```

This should now be more stable, should we add another button inside that div, for example. Next onto working with the loading button some more.
