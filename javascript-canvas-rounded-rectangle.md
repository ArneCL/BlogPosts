title: Javascript: Draw rounded rectangle in canvas
tags: javascript,canvas

Canvas doesn't provide a method to do rounded rectangles. But we can make one with arcs and lineTos.

We can also add it to the `CanvasRenderingContext2D` prototype. This means we can use it like the below. And set your own stroke and fill styles:

```javascript
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');  
  ctx.beginPath();
  ctx.roundedRectangle(0, 0, 100, 100, 20)
  ctx.stroke
  
  ctx.beginPath();  
  ctx.roundedRectangle(5, 5, 90, 90, 15)
  ctx.stroke();     
```

Here's the function to draw a rounded rectangle.

```javascript
CanvasRenderingContext2D.prototype.roundedRectangle = function(x, y, width, height, rounded) {
  const radiansInCircle = 2 * Math.PI
  const halfRadians = (2 * Math.PI)/2
  const quarterRadians = (2 * Math.PI)/4  
  
  // top left arc
  this.arc(rounded + x, rounded + y, rounded, -quarterRadians, halfRadians, true)
  
  // line from top left to bottom left
  this.lineTo(x, y + height - rounded)

  // bottom left arc  
  this.arc(rounded + x, height - rounded + y, rounded, halfRadians, quarterRadians, true)  
  
  // line from bottom left to bottom right
  this.lineTo(x + width - rounded, y + height)

  // bottom right arc
  this.arc(x + width - rounded, y + height - rounded, rounded, quarterRadians, 0, true)  
  
  // line from bottom right to top right
  this.lineTo(x + width, y + rounded)  

  // top right arc
  this.arc(x + width - rounded, y + rounded, rounded, 0, -quarterRadians, true)  
  
  // line from top right to top left
  this.lineTo(x + rounded, y)
  
  this.closePath()
}
```
