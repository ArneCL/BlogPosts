title: Javascript: Create game obstacles in canvas
tags: javascript, canvas

In our previous tutorial on canvas we smoothly moved a player (read: rectangle). We can use the same kind of code to generate obstacles.

We're going to have obstacles moving from the left to the right of the screen.

First let's create an array with an initial obstacle: `var obstacles = [{width: 30, height: 30, x: canvas.width, y:110}]`.

In our update function we'll loop through them all and draw those rectangles. And move the `x` each frame back to create movement.

```
function updateGameArea() {
    context.clearRect(0, 0, canvas.width, canvas.height)  
    obstacles.forEach(o => {
      o.x -= 1
      context.fillRect(o.x, o.y, o.width, o.height);      
    })

    requestAnimationFrame(updateGameArea);  
}
```

We obviously only have one obstacle. Let's now create a new one each time we see 100 frames. A frame is a counter that is incremented on each animation draw.

```
var frame = 0
function updateGameArea() {
    frame++
    context.clearRect(0, 0, canvas.width, canvas.height)
  
    if(frame % 100 == 0) obstacles.push({width: 30, height: 30, x: canvas.width, y:canvas.height * Math.random()});
  
    obstacles.forEach(o => {
      o.x -= 1
      context.fillRect(o.x, o.y, o.width, o.height);      
    })

    requestAnimationFrame(updateGameArea);  
}
```

We'll also randomise the y position of the obstacles.

Our full code is:

```
var canvas = document.querySelector("canvas")
var context = canvas.getContext("2d");
var obstacles = [{width: 30, height: 30, x: canvas.width, y:110}];
var frame = 0
function updateGameArea() {
    frame++
    context.clearRect(0, 0, canvas.width, canvas.height)
  
    if(frame % 100 == 0) obstacles.push({width: 30, height: 30, x: canvas.width, y:canvas.height * Math.random(), speedX: 0.0, speedY: 0.0});
  
    obstacles.forEach(o => {
      o.x -= 1
      context.fillRect(o.x, o.y, o.width, o.height);      
    })

    requestAnimationFrame(updateGameArea);  
}

requestAnimationFrame(updateGameArea);
```

