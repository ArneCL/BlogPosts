title: Android: Custom Views' onLayout and onMeasure 
tags: android,android-custom-view

If you want to layout a custom view's children yourself, as opposed to making the custom view extend LinearLayout or similar, you need to implement the onLayout and onMeasure methods of the ViewGroup class.

### onLayout()

Let's first look at onLayout(). This tells your custom view's children where they should lay themselves out:

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
      childCount = getChildCount();
      for(int i=0; i<childCound;i++) {
        View v = getChildAt(i);
        ...
      }
    }
    
This method is called by the ViewGroup, passing in the parent's dimensions. 

The 'left' and 'top' is the left and right from the custom view's parent, this is normally zero unless you have set margins on your custom view.

Then we get the number of children and are about to process eac hin the loop.

The method we must call on each of the views' in the loop is 

    v.layout(left, top, right, bottom). 
    
If 'left' or 'top' are 0 this means right at the left and top edge of the parent. 

If you have defined some padding on your custom view, you must include these in your layout call, otherwise the padding will be in front of the view.

### onMeasure()

Before you can call methods such like getMeasuredWidth() on your ViewGroup's children, however, you must tell them how to measure themsevles in onMeasure:

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
      ...
    }

The two parameters passed in are int values which represent the mode and side of the width and height.

Let's say you passed in match_parent to the layout_width parameter in your View's XML, and the width of your view's parent is 400, then the following would be true:


    int mode = MeasureSpec.getMode(widthMeasureSpec) // mode == View.MesaureSpec.EXACTLY
    int size = MeasureSpec.getSize(widthMeasureSpec) // size == 400
    
In this method you must call either its super method or setMeasuredDimension() with the width specifications and height specification either passed into the method or created with MeasureSpec.makeMeasureSpec(size, mode).

You must also call the measure(widthSpec, heightSpec) on the child views too.

      for(int i=0; i<childCound;i++) {
        View v = getChildAt(i);
        v.measure(widthSpec, heightSpec);
      }
      
If you wanted to give each view the same measurements as its parents (BUT WHY???) you could give it its parent's measure specs, or create your own via the makeMeasureSpec above, perhaps by using a division of the parent's getMeasuredWidth(), taking into account any padding using the getPadding*() methods.
