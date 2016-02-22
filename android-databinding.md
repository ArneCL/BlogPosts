title: Android Databinding basics
tags: android,android-databinding

Although a large topic, databinding is simple to set up. From Android Studio 2.0, in your app's AndroidManifest.xml:

    android {
      ...
      dataBinding {
          enabled = true
      }
      ...
    }

Then change your layout file, `main_activity.xml` for the most basic version, to something like:

    <?xml version="1.0" encoding="utf-8"?>
    <layout xmlns:android="http://schemas.android.com/apk/res/android">
      <data>
        <variable
            name="thingvar"
            type="com.example.blar.myapplication.Thing"
            />
      </data>
      ...
    </layout>

The data section defines variables, and specify a type. In our case, the `Thing` class is POJO:

    public class Thing {
      private String thing;
    
      public Thing(String thing) {
        this.thing = thing;
      }
    
      public String getThing() {
        return thing;
      }
    
      public void setThing(String thing) {
        this.thing = thing;
      }
    }

To bind a property, in an element, `TextView` for example, set the attribute `android:text=@{thingvar.thing}`.

Now in your Activity, instead of `setContentView()`, use the follow binding methods:

    Thing test = new Thing("Test");
    final MainActivityBinding binding = DataBindingUtil.setContentView(this, R.layout.main_activity);
    binding.setThing(test);

The `MainActivityBinding` class is autogenerating based on your layout file name, `main_activity` in this case.

Not only does setting the `Thing` class on the binding update the `TextView` we mentioned, but you can also avoid `findViewById()` call. They're now available via `binding.theIDofYourElement`. 
