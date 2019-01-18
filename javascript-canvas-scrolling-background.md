title: Javascript: A scrolling background in canvas
tags: javascript, canvas

If you want a scrolling background in Canvas let's first do the initial canvas stuff, including specifying the canvas width and height, and setting a new image and loading a local png file in it.

```
var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")
var canvasWidth = 1000 // for example
var canvasHeight = 400 // for example
var image = new Image()
image.src = "somefile.png" // for example
```

Next let's specify the scrolling speed in pixels and initial `x` position:

```
var speed = -0.2
var x = 0;
```

Let's create a update function. It will move the `x` position depending on the pixel speed. 

Then it will draw two images, one that will be scrolling off the screen, another that will be to the right of it.

```
function update() {
  x += speed
  x %= canvasWidth
  ctx.drawImage(image, x, 0, 
    canvasWidth, canvasHeight)
  ctx.drawImage(image, x + canvasWidth, 0, 
    canvasWidth, canvasHeight)

  requestAnimationFrame(update)                      
} 
requestAnimationFrame(update)                      
```

It's doing two other things. 

0. The whole thing is started with `requestAnimationFrame(update)`. It will only call `update` once though. So in `update` we must call it again.
0. Say the canvas width is `500`. Once `x` is 501 the image will be off the canvas. To make it back we can do `501 % 500` to get the position `1`. (And when it's `499` that will produce `499` anyway). So that what the `x %=500` lines does.
