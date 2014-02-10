title: Android: ViewDragHelper tutorial
tags: android,android-viewdraghelper

If you want to drag things around your screen, you'll want to use the compatability library's ViewDragHelper class.

You'll first need to make your own ViewGroup extending custom view, since we'll be intercepting MotionEvents.

### Creating an instance

Once you've made your custom view extending ViewGroup, you need to create a ViewDragHelper instance. We'll put it in onAttachedToWindow().

    @Override
    protected void onAttachedToWindow() {
    	super.onAttachedToWindow();
    	mDragHelper = ViewDragHelper.create(this, 1.0f, new OurViewDragHelperCallbacks());
    	...
    }
    
We're using the create() factory method, passing in this ViewGroup, the sensitivity for a drag start (1.0f is normally according to the docs), and some callbacks.

### Motion events

Before we look at the callbacks, let's look at how they are activiated, and for that we look at onInterceptTouchEvent() and onTouchEvent().

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
      boolean shouldInterceptTouchEvent = mDragHelper.shouldInterceptTouchEvent(ev);
    	return shouldInterceptTouchEvent;
    }
    
This method uses our drag helper to decide if our class should intercept the touch events or not. We use this so if our child view is a button, for example, we can both press and slide it.

Next we use the onTouchEvent() method to make the view drag helper process this motion event, which will be called according to the interaction of the view and the method above.

    @Override
    public boolean onTouchEvent(MotionEvent event) {
    	Log.d("DRAG on touch", event.toString());
    	mDragHelper.processTouchEvent(event);
    	return true;
    }
    
Now we have the MotionEvents being passed correctly to our ViewDragHelper instance, we can look at the callbacks.

    new ViewDragHelper.Callback() {
    
    	@Override
    	public boolean tryCaptureView(View arg0, int pointerId) {
    		return true; 
    	}
    	
The above will be passed the views which are dragged, and allow you to say if they should be captured or not. In this case we're saying deal with any of the ViewGroup's children.
    	
    	@Override
    	public int clampViewPositionVertical(View child, int top, int dy) {
    		return top;
    	}
    	
The above method allows us to drag on the vertical axis. If we're happy with the new position of the drag, we just return the 'top' value. You can define clamp the dragging in certain regions using this method.

This has a sister, clampViewPositionHorizonal, that allows you to drag or constrain on the horizonal axis.
    	

    	@Override
    	public int getViewVerticalDragRange(View child) {
    		return parent.getMeasuredHeight()-child.getMeasuredHeight();
    	}
    	
The above method is used to calculate the velocity internally, by knowing your view's dragging space. Again, it has a sister method, replacing Vertical for Horizonal.
    	
    	@Override
    	public void onViewReleased(View releasedChild, float xvel, float yvel) {
    		super.onViewReleased(releasedChild, xvel, yvel);
    		if(yvel>0) {
    			mDragHelper.settleCapturedViewAt(releasedChild.getLeft(), parent.getMeasuredHeight()-releasedChild.getMeasuredHeight());
    		} else {
    			mDragHelper.settleCapturedViewAt(releasedChild.getLeft(), 0);
    		}
    		invalidate();
    	}
    });
    	
The above method, and final we'll look at, is called when the dragging of an element stops. We're using it to see if the velocity of the drag in the Y axis is positive or negative. 

If it's positive, i.e. we're dragging down, we take the released view and tell it slide down down to the bottom of the parent. If it's negative, i.e. we're dragging up, we slide up to the top.

We finally call invalidate so the animation can begin. There are other methods we can call on the drag helper, like smoothSlideViewTo, but settleCatpuredViewAt takes into account the current velocity.

### Ensureing the animation continues

After we call the settleCapturedViewAt or similar methods above, we need to ensure the animatin continues. In the computeScroll() method on our ViewGroup or similar we have the following:

    @Override
    public void computeScroll() {
    	super.computeScroll();
    	if(mDragHelper.continueSettling(true)) {
    		ViewCompat.postInvalidateOnAnimation(this);
    	}
    }
	
We call the continueSettling method on the ViewDragHelper instance so our animation continues, and if it's not yet settled, we then go and call the postInvalidateOnAnimation() method to ensure we keep animating.

There are plenty of other methods to play with here https://developer.android.com/reference/android/support/v4/widget/ViewDragHelper.html
