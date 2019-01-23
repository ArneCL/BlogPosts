title: Javascript: Collision detection in canvas
tags: javascript, canvas

Previously we created a player on the screen and created obstacles:

```
var canvas = document.querySelector("canvas")
var context = canvas.getContext("2d");
var obstacles = [{width: 30, height: 30, x: canvas.width - 110, y:110}];
var player = {width: 30, height: 30, x: 0, y:100, speedX: 0.0, speedY: 0.0};
var frame = 0

function updateGameArea() {
    frame++
    context.clearRect(0, 0, canvas.width, canvas.height)
  
    // Add a new obstacle
    if(frame % 100 == 0) obstacles.push({width: 30, height: 30, x: canvas.width, y:canvas.height * Math.random(), speedX: 0.0, speedY: 0.0});
    // Render the obstacles
    obstacles.forEach(o => {
      o.x -= 1
      if(o.hit) context.fillStyle = "red"
      context.fillRect(o.x, o.y, o.width, o.height);    
      context.fillStyle = "black"
    })
  
    // Change the player position
    player.x += player.speedX;
    player.y += player.speedY;
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(updateGameArea);
}

// When the user pressed the array keys change the speed on the player
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

// When the use releases the key, stop the speed and thus position movement
window.onkeyup = function(event) {
  event.preventDefault() // stop the arrow keys scrolling the page
  player.speedX = 0
  player.speedY = 0
}

requestAnimationFrame(updateGameArea);
```

We're going to use a function that detects if a box (somethig with width, height, x and y properties) is touching another:

```
function hasHit(box1, box2) {
  var box1Right = box1.x + box1.width
  var box1Bottom = box1.y + box1.height  
  var box2Right = box2.x + box2.width
  var box2Bottom = box2.y + box2.height  
  
  if(box1Right > box2.x && box2Right > box1.x && 
    box1Bottom > box2.y && box2Bottom > box1.y) return true;
  else return false;
}
```

In the update function, we're going to look at all the obstacles, and check that against our player. If collide, we set a 'hit' property on our obstacle object:

```
obstacles.forEach(o => {
  if (hasHit(player, o)) {
    o.hit = true;
  }
});
```

And we'll change our code that renders the obstacles, to do something if 'hit' is true:

```
obstacles.forEach(o => {
  o.x -= 1
  if(o.hit) context.fillStyle = "red"
  context.fillRect(o.x, o.y, o.width, o.height);    
  context.fillStyle = "black"
})
```

Our full code is:

```
var canvas = document.querySelector("canvas")
var context = canvas.getContext("2d");
var obstacles = [{width: 30, height: 30, x: canvas.width - 110, y:110}];
var player = {width: 30, height: 30, x: 0, y:100, speedX: 0.0, speedY: 0.0};

var frame = 0
function updateGameArea() {
    frame++
    context.clearRect(0, 0, canvas.width, canvas.height)
  
    // render the obstacles
    if(frame % 100 == 0) obstacles.push({width: 30, height: 30, x: canvas.width, y:canvas.height * Math.random(), speedX: 0.0, speedY: 0.0});
    obstacles.forEach(o => {
      o.x -= 1
      if(o.hit) context.fillStyle = "red"
      context.fillRect(o.x, o.y, o.width, o.height);    
      context.fillStyle = "black"
    })
  
    // change the player
    player.x += player.speedX;
    player.y += player.speedY;
    context.fillRect(player.x, player.y, player.width, player.height);
  
    // collision detection
    obstacles.forEach(o => {
      if ( hasHit(player,o) ) {
        o.hit = true;
      }
    });

    requestAnimationFrame(updateGameArea);
}


function hasHit(box1, box2) {
  var box1Right = box1.x + box1.width
  var box1Bottom = box1.y + box1.height  
  var box2Right = box2.x + box2.width
  var box2Bottom = box2.y + box2.height  
  
  if(box1Right > box2.x && box2Right > box1.x && 
    box1Bottom > box2.y && box2Bottom > box1.y) return true;
  else return false
}

// When the user pressed the array keys change the speed on the player
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

// When the use releases the key, stop the speed and thus position movement
window.onkeyup = function(event) {
  event.preventDefault() // stop the arrow keys scrolling the page
  player.speedX = 0
  player.speedY = 0
}

requestAnimationFrame(updateGameArea);
```
