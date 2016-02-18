title: Android's DrawerLayout
tags: android,android-drawerlayout

If you want a drawer layout, you need to have layout like so. A DrawerLayout, with two children, the first being the content and the second being the drawer. The `layout_gravity` tells us what side to launch the drawer from.

    <android.support.v4.widget.DrawerLayout
        android:id="@+id/drawer"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <FrameLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent">
            <TextView
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:text="hi"/>
        </FrameLayout>
        <FrameLayout
            android:layout_width="240dp"
            android:layout_gravity="start"
            android:layout_height="match_parent">
            <TextView
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:text="there"/>
        </FrameLayout>
    </android.support.v4.widget.DrawerLayout>

Then in your `onCreate`, first set our swish new `Toolbar` to be the actionbar, second set a DrawerToggle and set that to the toolbar, third set the drawer layout to listen to the drawer toggle.

    setSupportActionBar(toolbar);
    DrawerLayout = (DrawerLayout) findViewById(R.id.drawer);
    mDrawerToggle = new ActionBarDrawerToggle(this, mDrawer, toolbar,
            R.string.drawer_open, R.string.drawer_close);
    mDrawerLayout.setDrawerListener(mDrawerToggle);

There's various syncing and actions to be done on opening the drawer, but that's the minimum.

Finally, `onOptionsItemSelected` must have the code to actually open the drawer once on the toolbar toggle has been set.

    if (mDrawerToggle.onOptionsItemSelected(item)) {
        return true;
    }
