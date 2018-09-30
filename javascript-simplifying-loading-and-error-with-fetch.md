title: Javascript: Simplifying fetching data and showing loading indicators and error displays
tags: javascript

Previously we created an error display when a `fetch` failed, and integreated a loading spinner in that (https://newfivefour.com/javascript-add-an-error-display.html).

The code to set the loading and error display is as follows: 

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

The code to start and stop the loading indicator and show the error will be the same for all our future remote data fetches. So let's integreate that code into our `sensibleFetch` function, renaming it accorindly:

```
function sensibleFetchWithLoadingAndError() {
  var loadingDyn = arguments[0]
  var errorDyn = arguments[1]
  var fetchArguments = [...arguments].slice(2)
  return new Promise((res, rej) => {
    dynSet(loadingDyn, true)
    dynSet(errorDyn, "")
    fetch(fetchArguments)
    .then(r => {
      dynSet(loadingDyn, false)
      if(r.ok) return r.json()
        .then(json => { console.log(json); res(json) })
        .catch(error => { console.log(error); rej(json) })
      else {
        rej(`${r.statusText} (${r.status})`)
        dynSet(errorDyn, `${r.statusText} (${r.status})`)
      }
    })
    .catch(e => {
      dynSet(loadingDyn, false)
      rej(e)
    })
  })
}
```

We can now simply our `fetchData` code down to this:

```
function fetchData(inputText) {
    sensibleFetchWithLoadingAndError("loading", "error",
      `https://newfivefour.com:3000/name?name=${inputText}`)
    .then(json => {
      dynSet("change_it", json.map(place => place.name))
    })
  }
```

The new cleaned up version of our code is at: https://jsfiddle.net/newfivefour/mkx0cf5g/21/

(I've also changed around the order of the `loadingButton` arguments to make them consistent with the function that shows the error display)
