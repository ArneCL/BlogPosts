Title: Android: Custom views and attributes
Tags:  android|android-custom-views
Date: 2013-01-31 11:57:15 -0500 
Author: Denevell

First create a class that extends a View, like FrameLayout here. It inflates a normal layout. You can skip that if you extends a TextView or something.

     public class CustomView extends FrameLayout {
     
      public CustomView(Context context) {
        super(context);
      }
     
      public CustomView(Context context, AttributeSet attrs) {
        super(context, attrs);
        LayoutInflater layoutInflator = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View layout = layoutInflator.inflate(R.layout.generic_error_overlay, this);
      }
     
      @Override
      public void onRestoreInstanceState(Parcelable state) {
        if (state instanceof Bundle) {
          Bundle bundle = (Bundle) state;
          // Restore things from bundle here
          super.onRestoreInstanceState(bundle.getParcelable("instanceState"));
          return;
        }
        super.onRestoreInstanceState(state);
      }
     
      @Override
      protected Parcelable onSaveInstanceState() {
        Bundle bundle = new Bundle();
        bundle.putParcelable("instanceState", super.onSaveInstanceState());
        // Add things to bundle here
        return bundle;
      }
     
     }

The onSaveInstanceState / onRestoreInstanceState methods allow you to save the View's state. 

To use this in a layout you can do something like:

    <your.package.where.the.view.lives.CustomView
     android:layout_width="wrap_content"
     android:layout_height="wrap_content" />

If you want to pass custom attributes, first define the XML namespace in the root element in your layout file:

 xmlns:yournamespace="http://schemas.android.com/apk/res-auto"
Then you can use a custom attribute in your XML custom view:

    <your.package.where.the.view.lives.CustomView
     android:layout_width="wrap_content"
     yournamespace:your_attribute="Hello"
     android:layout_height="wrap_content" />

You then need to define this attribute in attrs.xml. We'll make this one a string.

    <resources>
    ...
     <declare-styleable name="YourAttribute">
         <attr name="your_attribute" format="string"></attr>
     </declare-styleable>
    ...
    </resources>

Then in the constructor for your custom view, you can grab this:

    ...
    TypedArray a = context.getTheme().obtainStyledAttributes(attrs, R.styleable.YourAttribute, 0, 0);
    try {
     String string = a.getString(R.styleable.YourAttribute_your_attribute);
    } finally {
     a.recycle();
    }  	
    ...

Note we're recycling the TypedArray as it's a shared object. We also refer the the generated styleable attributes in gen that are generated when you added values on attrs.xml.
