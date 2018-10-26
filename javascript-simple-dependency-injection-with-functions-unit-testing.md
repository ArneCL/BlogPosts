title: Javascript: Simple dependency injection for unit testing
tags: javascript,dependency-injection

With destruction object parameters with default values you can easily implement dependency injection.

We can use default values easily in ES2015:

```
var func = function(a, b = "second parameter") {
   console.log(a, b)
}
func("first parameter")
```

This would print `first parameter second parameter`. And we could use this default parameter to pass in our dependency:

```
var getFromServer = function(url, _di_fetch = fetch) {
  _di_fetch(url)
}
getFromServer("https://newfivefour.com:3000/id?id=E14000874")
```

Then we could test the function by passing in a fake `fetch` as the second parameter. But we would have to know the order of parameters to use dependency injection.

We can use destructing object parameters to get aroudn this:

```
var getFromServer = function({url, _di_fetch = fetch}) {
  _di_fetch(url)
}
getFromServer({url: "https://newfivefour.com:3000/id?id=E14000874"})
```

We now name the parameters and simply don't name the dependency injection parameter to get the default value.

We can test it as thus:

```
let fakeFetch = url => console.log(`The fake fetch has been passed ${url}`)
getFromServer({url: "www.google.com", _di_fetch: fakeFetch})
```

And now it will print `The fake fetch has been passed www.google.com`.

This is more a dependency injection solution than a full testing solution but it can be integrated into such with ease.
