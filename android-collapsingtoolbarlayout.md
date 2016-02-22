title: Android Design Library: CollapsingToolbarLayout basics
tags: android,android-collapsingToolbarLayout

Instead of using a plain `Toolbar` element in your `AppBarLayout`, you have achieve a nice parallax effect with `CollapsingToolbarLayout`.

Replace the old Toolbar with a `CollapsingToolbarLayout` setting its height to be the full uncollapsed height, give it a `layout_scrollflags=scroll|exitUntilCollapsed`. If you use `app:layout_scrollFlags="scroll|enterAlways"` it'll uncollapse as soon as your start scrolling up.

Within such, place your old Toolbar, and give it a `layout_collapseMode` of `pin`, to say pin the Toolbar when it's all collapsed.

Above it have a ImageView, with a the `layout_collapseMode` of `parallax`. And voila.

    <android.support.design.widget.CollapsingToolbarLayout
        android:layout_width="match_parent"
        android:layout_height="250dp"
        app:layout_scrollFlags="scroll|exitUntilCollapsed"
        app:contentScrim="@android:color/holo_purple"
        >
      <ImageView
          android:layout_width="match_parent"
          android:layout_height="match_parent"
          app:layout_collapseMode="parallax"
          android:scaleType="matrix"
          android:src="@mipmap/orb"
          />
      <android.support.v7.widget.Toolbar
          android:id="@+id/toolbar"
          android:layout_width="match_parent"
          android:layout_height="?attr/actionBarSize"
          app:layout_collapseMode="pin"
          app:popupTheme="@style/AppTheme.PopupOverlay"
          />
    </android.support.design.widget.CollapsingToolbarLayout>
