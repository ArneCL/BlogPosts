Title: Android: Actionbar setup
Tags: android|android-actionbar
Date: 2012-12-12 16:18:07 -0500 
Author: Denevell

Create an options menu as normal. I.e. in your onCreate() method issue:

     setHasOptionsMenu(true);

And override methods to create the options menu

     @Override
     public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        inflater.inflate(R.menu.yourmenu, menu);
        super.onCreateOptionsMenu(menu, inflater);
     }

The yourmenu menu will live in res/menu/yourmenu.xml and look something like:

     <menu xmlns:android="http://schemas.android.com/apk/res/android">
        <item android:id="@+id/menu_refresh"
            android:title="@string/menu_refresh"
            android:icon="@drawable/youricon"
            android:showAsAction="always"/>
     </menu>

The showAsAction attribute means you'll always see it - it won't be folded into a menu.

Et voila.
