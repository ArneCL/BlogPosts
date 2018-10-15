title: Javascript: Add an error display to our system
tags: javascript,css
date: Sun Sep 30 2018

Previously we added an animated loading button during our `fetch`. (https://newfivefour.com/javascript-making-custom-components.html)

Now we need to do the error display. We will have a closable fixed div on the screen. Here's the Javascript/HTML that does that:

```
div(`position: fixed; bottom: 0px; left: 0px; background-color: red;
     width: 100%; padding: 5px; box-sizing: border-box; 
     color: white; display: flex`, 
  text("some error"),
  span("flex-grow: 1", text("")),
  div("cursor: pointer", text("close"),
    ["click", (e, n) => n.parentNode.style.display="none"])
)
```

But we want this to be displayed or hidden based on a `dyn` call:

```
dyn("error", "", error => 
  div(`position: fixed; bottom: 0px; left: 0px; background-color: red;
       width: 100%; padding: 5px; box-sizing: border-box; 
       color: white; display: ${error.length>0 ? "flex" : "none"}`, 
    text(error),
    span("flex-grow: 1", text("")),
    div("cursor: pointer", text("close"),
      ["click", (e, n) => n.parentNode.style.display="none"])
  )
)
```

This is a large piece of dull code so let's put it into a function call:

```
function staticErrorDisplay(dynName) {
  return dyn(dynName, "", error => 
    div(`position: fixed; bottom: 0px; left: 0px; 
         background-color: red;
         width: 100%; padding: 5px; box-sizing: border-box; 
         color: white; display: ${error.length>0 ? "flex" : "none"}`, 
        text(error),
        span("flex-grow: 1", text("")),
        div("cursor: pointer", text("close"),
            ["click", (e, n) => n.parentNode.style.display="none"])
    )
  )
}
```

Previously we had some `div`s to make a column layout aligned on the left. That was also a bit tedius so let's put it in a function also:

```
function columnLeft() {
  return div(`display: flex; flex-direction: column; 
              align-items: flex-start;`, [...arguments])
}
```

Our new Javascript generated HTML will look like this:

```
body(
  div(
    staticErrorDisplay("error"),
    dyn("change_it", ["one", "two", "three"], data =>
      ol(data.map(t =>
        li(text(t)))
      )
    ),
    columnLeft(
      input(["placeholder", "Input: lon, man, liv, etc"]),
      loadingButton(
        button(text("Search!")), 
        (e, node) => fetchData(node.previousSibling.value),
        "loading"
      ),
    )
  )
)
```

Now it's time to turn on and off that error from our `fetchData` function, where we turn on and off this new `dyn` function.

```
function fetchData(inputText) {
  dynSet("loading", true)
  dynSet("error", "")
  sensibleFetch(`https://newfivefour.com:3000/name?name=${inputText}`)
  .then(json => {
    dynSet("loading", false)
    var list = json.map(place => place.name)
    dynSet("change_it", list)
  })
  .catch(e => {
    dynSet("loading", false)
    dynSet("error", e)
    console.log("A bad request!", e)
  })
}
```

Now press `search` when there's nothing in the input box and my NodeJS server will serve you up a 400 response.

Now we have dynamic DOM updates, remote data fetches, an animated loading button on remote data fetch, an error dialogue and some very simple new "tags".

The `fetchData` method is getting a bit out of hand, but we can come to that later. 

Here's a working example: https://jsfiddle.net/newfivefour/0vo6h41f/32/
