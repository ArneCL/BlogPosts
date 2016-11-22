title: Android: Style Toolbar/ActionBar and centre text
tags: android,android-toolbar

In recent support library updates, we have the `Toolbar` to use instead of the standard ActionBar to style via various properties in your style xml files. 

You add this manually to your layout XML file.

    <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      xmlns:tools="http://schemas.android.com/tools">
      <android.support.v7.widget.Toolbar
          android:id="@+id/toolbar"
          android:layout_alignParentTop="true"
          android:layout_width="match_parent"
          android:layout_height="?attr/actionBarSize"
          android:background="@color/toolbar_background"
          >
      ...

If you want to centre the title text, for example, you now just add a normal TextView and centre align it.

          <TextView
              android:layout_width="match_parent"
              android:layout_height="wrap_content"
              android:textColor="@color/toolbar_text"
              android:gravity="center"
              tools:text="Some title"
              android:id="@+id/toolbar_text"
              style="@style/TextAppearance.AppCompat.Widget.ActionBar.Title"/>

Obviously this is a lot to put at the top of every activity, you can instead place it in a separate layout file and use an include directive:

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <include android:id="@+id/toolbar_layout"
            layout="@layout/toolbar_layout" />
        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_below="@+id/toolbar_layout">
    ...

In order to give this the title of your activity, you add this code in your onStart() method, or anywhere after the layout has been inflated:

    TextView toolbarText = (TextView) findViewById(R.id.toolbar_text);
    Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    if(toolbarText!=null && toolbar!=null) {
        toolbarText.setText(getTitle());
        setSupportActionBar(toolbar);
    }

This will grab our toolbar, grab the text view which will hold our title, set the text on our text view and set the toolbar as our ActionBar.

Now when options menu etc, it will appear in that toolbar.
