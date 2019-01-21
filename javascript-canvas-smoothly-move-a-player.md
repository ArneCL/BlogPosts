title: Javascript: Smoothly move a player in canvas
tags: javascript, canvas

Previously we learnt how to move a player around a canvas: https://newfivefour.com/javascript-canvas-move-a-player.html

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

But the movement is jerky. We can fix that.

We will make our `player` object take a speedX and speedY property firstly: `player = {width: 30, height: 30, x: 0, y:110, speedX: 0.0, speedY: 0.0};
`.

And in the update function we will change the player x and y by this variable:

```
function updateGameArea() {
    context.clearRect(0, 0, canvas.width, canvas.height)  
    player.x += player.speedX;
    player.y += player.speedY;
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(updateGameArea);  
}
```

All that's left is the onkeyup and down functions that change the speedX and speedY.

When the button is pressed down we'll increase the speed. And when it's released we'll completely stop the movement:

Here's all the code:

```
var canvas = document.querySelector("canvas")
var context = canvas.getContext("2d");
player = {width: 30, height: 30, x: 0, y:110, speedX: 0.0, speedY: 0.0};

function updateGameArea() {
    context.clearRect(0, 0, canvas.width, canvas.height)  
    player.x += player.speedX;
    player.y += player.speedY;
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(updateGameArea);  
}

window.onkeydown = function(event) {
  event.preventDefault() // stop the arrow keys scrolling the page
  if(event.keyCode == 40) { // down
    player.speedY += 1
  } else if(event.keyCode == 38) { // up
    player.speedY -= 1
  } else if(event.keyCode == 39) { // right 
    player.speedX += 1
  } else if(event.keyCode == 37) { // left
    player.speedX -= 1        
  } 
}

window.onkeyup = function(event) {
  event.preventDefault() // stop the arrow keys scrolling the page
  player.speedX = 0
  player.speedY = 0
}

requestAnimationFrame(updateGameArea);
```

