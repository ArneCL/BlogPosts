title: Android: Simpler passing objects to custom views with databinding 
tags: android,android-databinding,android-custom-views

If you have a custom view, you can pass an object to it via databinding. Let's say you have this basic custom view.

    public class CustomV extends Button {

      public static class APojo {
        private String oj;

        public String getOj() {
         return oj;
        }

        public void setOj(String oj) {
         this.oj = oj;
         }
      }

      private APojo thing;

      public CustomV(Context context) {
        super(context);
        init(null, 0);
      }

      public CustomV(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(attrs, 0);
      }

      public CustomV(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(attrs, defStyle);
      }

      private void init(AttributeSet attrs, int defStyle) {
        setText("Custom innit");
      }

      public APojo getThing() {
        return thing;
      }

      public void setThing(APojo thing) {
        this.thing = thing;
      }
    }

It's a basic custom view class, with a basic pojo class at at the top, a class variable and a getter and setter for that.

Now initialise this custom view:

    <com.example.CustomV
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      app:thing="@{somevar.someinstance}"
    />

The `somevar` is just a databinding variable instance you have. `someinstance` is an instance of the `APojo` class. And the `app:` namespace is the standard `xml:app="http://schemas.android.com/apk/res-auto"`.

Now when you initalise that view, the `setThing` method in your custom view will be called.
