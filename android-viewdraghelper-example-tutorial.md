title: Android: ViewDragHelper tutorial
tags: android,android-viewdraghelper

If you want to drag things around your screen, you'll want to use the compatability library's ViewDragHelper class.

You'll first need to make your own ViewGroup extending custom view, since we'll be intercepting MotionEvents.

Once you've made your custom view extending ViewGroup, you need to create a ViewDragHelper instance. We'll put it in onAttachedToWindow().

    @Override
    protected void onAttachedToWindow() {
    	super.onAttachedToWindow();
    	mDragHelper = ViewDragHelper.create(this, 1.0f, new OurViewDragHelperCallbacks());
    	...
    }
    
We're using the create() factory method, passing in this ViewGroup, the sensitivity for a drag start (1.0f is normally according to the docs), and some callbacks.

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
    	
The tryCaptureView will be passed the views which are dragged, and allow you to say if they should be captured or not. In this case we're saying deal with abny of the ViewGroup's children.
    	
    	@Override
    	public int clampViewPositionVertical(View child, int top, int dy) {
    		return top;
    	}
    	
This method allows us to drag on the vertical axis. If we're happy with the new position of the drag, we just return the 'top' value. You can define clamp the dragging in certain regions using this method.

This method has a sister, clampViewPositionHorizonal, that allows you to drag or constrain on the horizonal axis.
    	

    	@Override
    	public int getViewVerticalDragRange(View child) {
    		return parent.getMeasuredHeight()-child.getMeasuredHeight();
    	}
    	
This method is used to calculate the velocity internally, by knowing your view's dragging space.
    	
    	@Override
    	public void onViewReleased(View releasedChild, float xvel, float yvel) {
    		super.onViewReleased(releasedChild, xvel, yvel);
    		if(yvel>0) {
    			mDragHelper.settleCapturedViewAt(releasedChild.getLeft(), getMeasuredHeight()-releasedChild.getMeasuredHeight());
    		} else {
    			mDragHelper.settleCapturedViewAt(releasedChild.getLeft(), 0);
    		}
    		invalidate();
    	}
    	

    	
    });
