title: Javascript: Dynamically change HTML without calling the JS DOM functions
tags: javascript

In the previous post (https://newfivefour.com/javascript-create-html-with-javascript.html]) we started to make our HTML with Javascript. This gives us some flexibility. One of those flexibilities is the ability to use closures, functions that close over (or remember) data.

If we have a function that remembers its position in the DOM, and also allows the user to call it again, we can call it again to rerender that section of the DOM, all without using the DOM directly -- no `document.querySelector` or the like. We will call this function `dyn` for dynamic.

Let's say we have the Javascript rendered HTML:

```
div(
  dyn("change_it", "blue", data =>
    div(text(`the text: $data`))
  )
)
```

This looks normal except the `dyn` function. The function takes in an arbitary name, some default data ("blue" in this case) and a function that renders some html (which has the data with it).

It should, then print

```
<div>
  <div>the text: blue</div>
</div>
```

But afterwards, from javascript, we should be able to call `dynSet("change_it", "exciting")` to change the HTML to:

```
<div>
  <div>the text: exciting</div>
</div>
```

The `dyn` will return a function that takes in a the DOM node (`node => ...`) and then uses that render the DOM object. Current our `node` function (ergo `div()`, `span()` etc) don't know what to do when they're passed such a function. Let's change that. It's very easy, only the section `...if(arguments[i] instanceof Function) arguments[i](h)...` is new. This means that function is then responsible to adding itself to the document node.

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

Using this, and the helper methods from the last blog post, we can now use the ability to pass a function to our `node` (or `div` etc) function as a child:

```
document.body.appendChild(
  div(
    input(["value", "Hiya!"]),
    node => node.appendChild(h1(text("hi"))),
    div(text("I am some other text")),
  )
)
```

We can now use this to make our `dyn` function. This will save our function in `window.newfivefour.dynSetters`. And that saved function will have 'closed over` the DOM location for itself. This means when it's next run we'll be able to replace that DOM node with a new node.

```
function dyn(name, initialData, fn) {
  if(!window.newfivefour) window.newfivefour = {}
  if(!window.newfivefour.dynSetters) window.newfivefour.dynSetters = {}
  return (ele) => {
    var oldNode = undefined
    var savedFunction = (data) => {
      var newNode = fn(data)
      if(oldNode) {
        ele.replaceChild(newNode, oldNode) 
      } else {
        ele.appendChild(newNode)
      }
      oldNode = newNode
    }
    if(window.newfivefour.dynSetters[name]) window.newfivefour.dynSetters[name].push(savedFunction)
    else window.newfivefour.dynSetters[name] = [savedFunction]
    savedFunction(initialData)
  }
}
```

So now each time `dyn` is found by `node` it will save itself, and remembering its DOM parent, in `window.newfivefour.dynSetters`. We can now use this function to reset the dom. He's `dynSet` that does that:

```
function dynSet(name, data) {
  window.newfivefour.dynSetters[name].forEach(f => f(data))
}
```

Let's try it out.


```
body(
  div(
    dyn("change_it", "original", data =>
      div(text(`the text: ${data}`))
    ),
    button(text("change it"), 
      ["click", _ => dynSet("change_it", "new and exciting")]
    ),
  )
)
```

Here's a more advanced working example: https://jsfiddle.net/newfivefour/m6nh4uzq/2/ This can obviously be expanded so `data` is a full javascript object, with lists of tweets for example. 

Caveat 1: the `data => ` function must return a node, not an array of nodes, although the single node can of course return an array of nodes.

Caveat 2: This does not include a VirtualDOM library but would easily integrate one.

Caveat 3: This version of dyn is simplified for the blog post (see caveat 1) but it should work for most situations.
