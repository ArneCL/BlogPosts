title: Javascript: A better JSON fetch with the dyn function that gets user input
tags: javascript,css

Previously we used fetch to get remote JSON data to use with our `dyn` function. (https://newfivefour.com/javascript-use-fetch-with-our-dyn-function.html)

However, the JSON data did not change during user input. There was no user input! We can change that simply. Let's change our HTML so we have user input first:

```
div("display: flex; flex-direction: column; align-items: flex-start;",
  input(["placeholder", "search for something"]),
  button(text("search for UK constituency"), 
    ["click", ...]
  ),
)
```

The HTML is simple enough: We're making a column flex box and putting a input and button elements. I've left the `click` method empty. But we will grab the `event` object, use its `target` object and grab the data from `input` and send it to `fetchData`: 

```
["click", e => fetchData(e.target.previousSibling.value)]
```

(The good thing about this is that with javascript genereated HTML you don't have to worry about a blank space changing the DOM.)

The fetch data method now takes an argument and we pass that to the `fetch` using a template literal:

```
function fetchData(inputText) {
  sensibleFetch(`https://newfivefour.com:3000/name?name=${inputText}`)
  .then(json => {
    var list = json.map(place => place.name)
    dynSet("change_it", list)
  })
  .catch(e => console.log("A bad request!", e))
}
```

Here's the JSFiddle that demonstrates that: https://jsfiddle.net/newfivefour/Luoadm6f/12/

Note if you leave the input blank, you'll get a console.log, the one we defined in `.catch(e => console.log("A bad request!", e))`.
