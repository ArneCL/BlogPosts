title: Android Design Library: Navigation View
tags: android,android-navigationview

The navigation view is simple. It's usually used in the drawer layout. It shows a list of menu items as defined in XML and allows you to specify a header.

    <android.support.design.widget.NavigationView
        android:id="@+id/navigationview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:headerLayout="@layout/content_main"        
        app:menu="@menu/navigationview"
        >

The `menu` attribute links to a normal menu. And the `headerLayout` points to a layout which should really be a fragment within if you're doing anything jazzy.

If you enable to `checkable` attribute on your menu items, they stay highlighted after pressed, which is very nice in a drawer layout, obviously.

The menu items can also have an `app:actionLayout` attribute, and a layout will be placed on the hard right of the menu. Useful for unread counts and so on and so forth.

To do something when the navigation view's menu items are pressed, a normal listener is used. In our case we'll close our navigation drawer.

    mNavigationView = (NavigationView) findViewById(R.id.naviationview);
    mNavigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
        @Override
        public boolean onNavigationItemSelected(MenuItem item) {
            mDrawerLayout.closeDrawers();
            return true;
        }
    });
