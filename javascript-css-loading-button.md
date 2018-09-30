title: Javascript, CSS: Make an animated loading button that works with fetch
tags: javascript, css

In our previous post we remotely got JSON from a server and updated our page with `dyn` based on user input. (https://newfivefour.com/javascript-dynamically-fetch-remote-data.html)

We're not showing the loading indication, however, but we can do that CSS3 animations. Here's our new HTML that we'll use instead of the old `button`:

```
div("position: relative", 
  div(["class", "spinner"]),
  button(text("Search"))
),
```

We now put the button in a relative div, and in that relative div we put a new absolute div that has the `spinner` class. Here's the CSS spinner class:

```
@keyframes spinner {
  to {transform: rotate(360deg);}
}

.spinner {
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-top-color: blue;
  animation: spinner .6s linear infinite;
}
```

It sets a animated transform that rotates the element 360 degrees. It applies that animation to the `.spinner` class infinately every 0.6 seconds. 

The `.spinner` class has a border at its top, and it's 20px square. It's placed in the centre and it has a margin half it's width and height to centre it. It has a border-radius to make it round. It has a border-box sizing to stop the margin and padding enlarging the box.

We now have a spinning button. https://jsfiddle.net/newfivefour/17pj0wyt/7/ Next we will to turn it on and off and integrate it with `fetch`.

