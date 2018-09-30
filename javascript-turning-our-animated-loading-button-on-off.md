title: Javascript: Turning our animated loading button on and off
tags: javascript, css

Now we have our animated loading button (see https://newfivefour.com/javascript-passing-dom-node-to-event-listener.html), we can turn it on and off.

Our body will be the same as before except we're using a `dyn`, with the identifier "loading", to give our composite button it's animated class:

```
body(
  div(
    dyn("change_it", ["one", "two", "three"], data =>
      ol(data.map(t =>
        li(text(t)))
      )
    ),
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
  )
)
```

Next, in our `fetchDate` function we'll turn this on and off:

```
function fetchData(inputText) {
  dynSet("loading", true)
  sensibleFetch(`https://newfivefour.com:3000/name?name=${inputText}`)
  .then(json => {
    dynSet("loading", false)
    var list = json.map(place => place.name)
    dynSet("change_it", list)
  })
  .catch(e => {
    dynSet("loading", false)
    console.log("A bad request!", e)
  })
}
```

And now every time we make a network request the loading spinner will appear on the button and disappear when the fetch is over.

Here's a working example: https://jsfiddle.net/newfivefour/m0dta59v/11/

Next we can deal with cleaning up our code and looking at error messages.
