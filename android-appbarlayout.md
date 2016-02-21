title: Android Design Library: AppBarLayout
tags: android,android-appbarlayout

The `AppBarLayout`--working within a CoordinatorLayout--allows you to scroll the stuff in the app bar, namly the toolbar and tablayout most likely, when you scroll a inner container, like a RecyclerView.

The scrollabel view must have a `app:layout_behavior="@string/appbar_scrolling_view_behavior"` else it'll overlap the AppBarLayout.

It must also be within the `CoordinatorLayout` that holds the `AppBarLayout`.

The `app:layout_scrollFlags=` flags control how the views within will be scrolled.

    <android.support.design.widget.CoordinatorLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        >
      <android.support.design.widget.AppBarLayout
          android:id="@+id/appbar"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          >
        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            app:layout_scrollFlags="scroll|enterAlways"
            />
        <android.support.design.widget.TabLayout
            android:id="@+id/tabLayout"
            style="@style/AppTheme.TabLayout"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:layout_scrollFlags="scroll|enterAlways"
            app:tabGravity="fill"
            app:tabMode="scrollable"
            />
      </android.support.design.widget.AppBarLayout>
      <android.support.v7.widget.RecyclerView
          android:id="@+id/rec_view"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          app:layout_behavior="@string/appbar_scrolling_view_behavior"
          android:layout_below="@+id/appbar"
          />
    </android.support.design.widget.CoordinatorLayout

If you leave out the `scrollFlags` from the `TabLayout`, you can scroll away the `Toolbar` but leave the `TabLayout`. Scream if you want to go faster.
