title: Javascript: Animate a sprite in canvas
tags: javascript,canvas

Let's say we have an image like this: http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/images/coin-sprite-animation-sprite-sheet.png

It has ten mini-images in it. We're going to show the different images in a sequence to create an animation.

But first let's load the image:

```
// First look at this 
// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/images/coin-sprite-animation-sprite-sheet.png

var ctx = document.getElementById('canvas').getContext('2d');
var img = new Image();
img.src = 'http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/images/coin-sprite-animation-sprite-sheet.png';

img.onload = function() {
  var totalNumberOfFrames = 10 // ten images in the image (see the url above)
  var imageFrameNumber = 0 // This is changed to make the sprite animate  
  var widthOfImage = img.width; // find the width of the image
  var heightOfImage = img.height; // find the height of the image
  var widthOfSingleImage = widthOfImage / totalNumberOfFrames; // The width of each image in the spirite
  
```

We're getting the width and height of the image once it's loaded. And we're getting the width of a single image in our large tile of images (our sprite above). We set a `imageFrameNumber` which we'll use next.

Next we're going to set a interval. When it's run we're going to clear the screen, then update the `imageFrameNumber`. We're going to make sure it goes from 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 and then back to 0 and 1, 2, 3, 4, 5, 6, 7, 8, 9 etc:

```
  setInterval(function() {
    ctx.clearRect(0, 0, 400, 400)    
    
    // Changes the sprite we look at    
    imageFrameNumber++; 
    // Change this from 0 to 1 to 2 ... upto 9 and back to 0 again, then 1...
    imageFrameNumber = imageFrameNumber % totalNumberOfFrames; 
    
     ...
    );      
  }, 100)
```

Next, we're going to draw the image we loaded above. When `imageFrameNumber` is 0 then we'll print the first sprite, and when it's 1 we'll print the second, etc:

```
    ctx.drawImage(img, 
      imageFrameNumber * widthOfSingleImage, 0, // x and y - where in the sprite
      widthOfSingleImage, heightOfImage, // width and height
      50, 50, // x and y - where on the screen
      widthOfSingleImage, heightOfImage // width and height
    );   
```

All our code is:

```
// First look at this 
// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/images/coin-sprite-animation-sprite-sheet.png

var ctx = document.getElementById('canvas').getContext('2d');
var img = new Image();
img.src = 'http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/images/coin-sprite-animation-sprite-sheet.png';

img.onload = function() {
  var totalNumberOfFrames = 10 // ten images in the image (see the url above)
  var imageFrameNumber = 0 // This is changed to make the sprite animate  
  var widthOfImage = img.width; // find the width of the image
  var heightOfImage = img.height; // find the height of the image
  var widthOfSingleImage = widthOfImage / totalNumberOfFrames; // The width of each image in the spirite
  
  setInterval(function() {
    ctx.clearRect(0, 0, 500, 500)    
    
    imageFrameNumber++; // changes the sprite we look at
    imageFrameNumber = imageFrameNumber % totalNumberOfFrames; // Change this from 0 to 1 to 2 ... upto 9 and back to 0 again, then 1...
    
    ctx.drawImage(img, 
      imageFrameNumber * widthOfSingleImage, 0, // x and y - where in the sprite
      widthOfSingleImage, heightOfImage, // width and height
      50, 50, // x and y - where on the screen
      widthOfSingleImage, heightOfImage // width and height
    );      
  }, 100)  
  
}
```
