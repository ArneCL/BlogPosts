title: Javascript: Move a player on the canvas
tags: javascript,canvas

We're going to create a player. This is a rectangle. We're going to move it around our canvas.

First create a HTML file a canvas tag with width and height attributes.

Let's start the javascript. Call `requestAnimationFrame` with a function that loops by calling `requestAnimationFrame` inside that function.

In the function clear the screen each time. Obviously nothing will be printed on the screen at this point.

```
var canvas = document.querySelector("canvas")
var context = canvas.getContext("2d");

function updateGameArea() {
    context.clearRect(0, 0, canvas.width, canvas.height)  
    requestAnimationFrame(updateGameArea);  
}

requestAnimationFrame(updateGameArea);
```

For the next iteration we'll create a player object. It will have height and width and an x and a y.

In the `updateGameArea` function we'll use these properties to draw a rectangle to the screen.

```
var canvas = document.querySelector("canvas")
var context = canvas.getContext("2d");
var player = {width: 30, height: 30, x: 0, y:110};

function updateGameArea() {
    context.clearRect(0, 0, canvas.width, canvas.height)  
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(updateGameArea);  
}

requestAnimationFrame(updateGameArea);
```

This now constantly prints a rectangle to the screen.

In the next iteration we will use a onkeydown listener to check for the left, right and up and down buttons.

When we find those, we will update the `player` x and y positions and thus move our player.

```
var canvas = document.querySelector("canvas")
var context = canvas.getContext("2d");
var player = {width: 30, height: 30, x: 0, y:110, speedX: 0.0, speedY: 0.0};

function updateGameArea() {
    context.clearRect(0, 0, canvas.width, canvas.height)  
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(updateGameArea);  
}

window.onkeydown = function(event) {
  event.preventDefault() // stops the button scrolling the page
  if(event.keyCode == 40) { // down
    player.y += 10
  } else if(event.keyCode == 38) { // up
    player.y -= 10    
  } else if(event.keyCode == 39) { // right 
    player.x += 10    
  } else if(event.keyCode == 37) { // left
    player.x -= 10        
  } 
}

requestAnimationFrame(updateGameArea);
```

And voila.
