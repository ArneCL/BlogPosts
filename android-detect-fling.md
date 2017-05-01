title: Android: Detect a fling
tags: android,android-fling

If you want to detect a fling on a view, create a `GestureDetector` that for an argument takes a `SimpleOnGestureListener`.

```
final static GestureDetector.SimpleOnGestureListener simpleDetector = new GestureDetector.SimpleOnGestureListener() {
    @Override
    public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
        super.onFling(e1, e2, velocityX, velocityY);
        Log.d("HI", "on fling");
        return true; // If you've consumed it
    }
};
final static GestureDetector detector = new GestureDetector(simpleDetector);
```

It's within these methods you calculate what kind of fling it is.

Within your `onTouch` event listener return with `return detector.onTouchEvent(motionEvent);`. 

And make sure the view you're listening on is `clickable`. And that should be it.
