title: Android: Passing objects to custom views with databinding
tags: android,android-databinding,android-custom-views

This is a bit voodoo, but that said... 

Let's say you include something like this as a static method anywhere in your codebase.

    @BindingAdapter("app:thing")
    public static void setThing(View v, Object s) {
      Log.d("A log, innit", "Called setThing");
    }

Note that the method name `setThing` is derived from `app:thing`. And the first parameter is a View and the second is an Object.

And then, in a databinding layout file, have something like

    <layout xmlns:android="http://schemas.android.com/apk/res/android"
           xmlns:app="http://schemas.android.com/apk/res-auto">
      <data>
        <variable
            name="thing"
            type="String"/>
      </data>
      <com.example.blar.myapplication.CustomView
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          app:thing="@{thing}"
          />
      ...

Then the above static method will be called when we try to set the `app:thing` attribute.

If in your static method you have something like this:

    CustomViewDatabindingSettable st = (CustomViewDatabindingSettable) v;
    st.passedDataBindingObject(s);

Then, providing your custom view implements `CustomViewDatabindingSettable`, you can call `passedDataBindingObject` passing through the databound variable.

For example, your custom view could be:

    public class ListView extends FrameLayout implements CustomViewDatabindingSettable {
      ...
      @Override
      public void passedDataBindingObject(Object o) {
        Log.d("HIYA", "We're in passedDataBindingObject: " + o);
        // Now do something with the data bound object.
      }
      ...
    }

Databinding and 'instant run' seems to mess up the autogeneration sometimes, in Android Studio 2.0 beta anyhow.

I had to uninstall the project from the device occassionally to remove dead code.
