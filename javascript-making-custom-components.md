title: Javascript: Making very simple custom components with javascript
tags: javascript

In our previous posts we started making HTML with javascript (https://newfivefour.com/javascript-turning-our-animated-loading-button-on-off.html).

This gives us a the ability to make new components, or new tags if you will, very easily.

Our previous code had this code to make a animated loading button: 

```
  div("display: flex; flex-direction: column; align-items: flex-start;",
    input(["placeholder", "Input: lon, man, liv, etc"]),
    div("position: relative", 
      dyn("loading", false, loading =>
        div("position: absolute;", ["class", loading ? "spinner" : ""]),
      ),
      button(text("Search")),
      ["click", (e, node) => fetchData(node.previousSibling.value)]
    ),
  )
```

It's very likely that the the code that has the button within it will be used again, and again, and again.

So let's put it in function instead:

```
function loadingButton(buttonNode, listener, dynLoadingName) {
  return div("position: relative", 
           dyn(dynLoadingName, false, loading =>
             div("position: absolute;", ["class", loading ? "spinner" : ""]),
           ),
           buttonNode,
           ["click", listener]
         )
}
```

We can now use this 'component' in our javascript:

```
div("display: flex; flex-direction: column; align-items: flex-start;",
  input(["placeholder", "Input: lon, man, liv, etc"]),
  loadingButton(
    button(text("Search!")), 
    (e, node) => fetchData(node.previousSibling.value),
    "loading"
  )
)
```

Loading button can now be used multiple times. See an example here: https://jsfiddle.net/newfivefour/ydsgapwn/6/
