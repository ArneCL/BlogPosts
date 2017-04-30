title: Android: Simple view dragging tutorial
tags: android,android-drag-drop

Let's say you've added a touch listener to a view. And in that listener you have a `motionEvent`.

Use this code to start dragging that view in `onTouch`.

```
if (motionEvent.getAction() == MotionEvent.ACTION_DOWN) {
    ClipData data = ClipData.newPlainText("", "");
    View.DragShadowBuilder shadowBuilder = new View.DragShadowBuilder(
            view);
    view.startDrag(data, shadowBuilder, view, 0);
    return true;
} else {
    return false;
}
```

The clipdata is the data passed to the drop area. And the shadowBuilder is what the view looks like when dragged.

There's no drop area, but you can look that up.
