title: Javascript: Bounding box collision detection
tags: javascript

If you want to detect when two boxes are touching, here's the classic algorithm:

```
function hasHit(box1, box2) {
  var box1Right = box1.x + box1.width
  var box1Bottom = box1.y + box1.height  
  var box2Right = box2.x + box2.width
  var box2Bottom = box2.y + box2.height  
  
  if(box1Right > box2.x && box2Right > box1.x && 
    box1Bottom > box2.y && box2Bottom > box1.y) return true;
  else return false
}

// the follow are overlapping
var box1 = { 
  x: 0, 
  y: 0, 
  width: 10, 
  height: 10 
}
var box2 = { 
  x: 5, 
  y: 5, 
  width: 10, 
  height: 10 
}
console.log("do they overlap?", hasHit(box1, box2))

// the follow are overlapping
var box3 = { 
  x: 0, 
  y: 0, 
  width: 10, 
  height: 10 
}
var box4 = { 
  x: 15, 
  y: 15, 
  width: 10, 
  height: 10 
}
console.log("do they overlap?", hasHit(box3, box4))
```
