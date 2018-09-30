title: Javascript: Use fetch to bring down JSON data
tags: javascript

Previously (https://newfivefour.com/javascript-dynamically-change-DOM-without-javascript-DOM-functions.html) we created a `dyn` function to dynamically update the DOM without using the JS DOM functions. Let's now use the `fetch` API to dynamically update our page with data from the internet using `fetch`.

`fetch` is a function that returns a Promise. A Promise returns either into the `then` or `catch` function on a good result or error respectively. It is a simple enough API. We will use a NodeJS server I wrote that gives you all the constitency names and codes in the UK.

```
fetch(`https://newfivefour.com:3000/name?name=man`)
.then(result => { ... })
.catch(error => { ... })
```

Inside the `then` however, it doesn't return the JSON data but a `result` object, and that object that a `json` function. And that function itself returns a Promise. And accordingly we must wait on that:

```
fetch(`https://newfivefour.com:3000/name?name=liv`)
.then(result => {
  result.json()
  .then(json => {
    ...
  })
  .catch(e => console.log(e))
})
.catch(e => console.log(e))
```

This is about manageable. But then `fetch` doesn't return into `catch` on a 404, 400, 500 error. It only returns into `catch` on a network error. 

This is getting messy so let's wrap this all up in a function called `sensibleFetch`. 

It will return a promise. That promise will run the `fetch` command with the passed in `arguments`. That `fetch` will called `sensibleFetch`'s Promise. It will call the `catch` side of the promise if the result is a failed JSON parse, if the server returns a non successful response (if the response is not `ok`) code or if the network is down. It will call the `then` side of the promise if all is okay:

```
function sensibleFetch() {
  return new Promise((res, rej) => 
    fetch(...arguments)
    .then(r => {
      if(r.ok) return r.json()
        .then(json => { console.log(json); res(json) })
        .catch(error => { console.log(error); rej(json) })
      else rej(`${r.statusText} (${r.status})`)
    })
    .catch(e => {
      rej(e)
    })
  )
}
```

(For demonstration purposes we're only dealing with JSON and the rejection side of the promise will see some text giving the status code and text).

Our code can now be:

```
body(
  div(
    dyn("change_it", ["one", "two", "three"], data =>
      ol(data.map(t =>
        li(text(t)))
      )
    ),
    button(text("change it"), 
      ["click", fetchData]
    ),
  )
)

function fetchData() {
  sensibleFetch(`https://newfivefour.com:3000/name?name=man`)
  .then(json => {
    var list = json.map(place => place.name)
    dynSet("change_it", list)
  })
  .catch(e => console.log(e))
}
```

You can see a working example here:

https://jsfiddle.net/newfivefour/0myka3ju/
