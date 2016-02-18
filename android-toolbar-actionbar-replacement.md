title: Android Toolbar: The ActionBar replacement
tags: android,android-toolbar

The old Actionbar was inflexible. So google created the aptly named Toolbar.

To use it, you need to disable the old Actionbar and window title in your styles.xml entries:

    <item name="windowActionBar">false</item>
    <item name="windowNoTitle">true</item>
    
Then your layout.xml should look something like this, with the height being the device's default and the background your preset primary colour, if you're using a plain LinearLayout for example:

    <LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
      <android.support.v7.widget.Toolbar
          android:id="@+id/toolbar"
          android:layout_width="match_parent"
          android:layout_height="?attr/actionBarSize"
          android:background="@color/colorPrimary"
          >
      </android.support.v7.widget.Toolbar>
    </LinearLayout>

Now the code for the initialisation in onCreate is simple enough, ensuring your Activity extends the right class, `AppCompatActivity` in my case:

    Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    setSupportActionBar(toolbar);
