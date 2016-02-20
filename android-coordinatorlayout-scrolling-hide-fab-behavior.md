title: Android: Hidingthe FAB and nested scroll events in CoordinatorLayout
tags: android,android-coordinatorlayout

The `CoordinatorLayout` helps you deal with nested scroll events from certain children, `RecyclerView` in our case.

If we place a `RecyclerView` and a `FloatingActionBar` in a CoordinatorLayout, we can tell the FAB to hide when we get a nested scroll event from the RecyclerView.

    <android.support.design.widget.CoordinatorLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:id="@+id/coord"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
    
        <android.support.v7.widget.RecyclerView
            android:id="@+id/rec_view"
            android:background="@android:color/holo_green_dark"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:scrollbars="vertical"
            >
        </android.support.v7.widget.RecyclerView>
        <android.support.design.widget.FloatingActionButton
            android:id="@+id/fab"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:src="@android:drawable/star_big_on"
            app:layout_behavior="com.example.blar.myapplication.ScrollAwareFABBehavior"
            app:layout_anchorGravity="bottom|right|end"
            />
    </android.support.design.widget.CoordinatorLayout

Note the FAB has `app:layout_behavior` pointing to a class. Let's look at that now.
    
    public class ScrollAwareFABBehavior extends CoordinatorLayout.Behavior<FloatingActionButton>  {
      public ScrollAwareFABBehavior(Context context, AttributeSet attrs) {
        super();
      }
    
      @Override
      public boolean onStartNestedScroll(final CoordinatorLayout coordinatorLayout, final FloatingActionButton child,
                                         final View directTargetChild, final View target, final int nestedScrollAxes) {
        return true;
      }
    
      @Override
      public void onNestedScroll(final CoordinatorLayout coordinatorLayout,
          final FloatingActionButton child,
          final View target, final int dxConsumed, final int dyConsumed,
          final int dxUnconsumed, final int dyUnconsumed) {
        super.onNestedScroll(coordinatorLayout, child, target, dxConsumed, dyConsumed,mdxUnconsumed, dyUnconsumed);
        if (dyConsumed > 0 && child.getVisibility() == View.VISIBLE) {
          child.hide();
        } else if (dyConsumed < 0 && child.getVisibility() != View.VISIBLE) {
          child.show();
        }
      }
    }

The first `onStartNestedScroll` method asks if we want to respond to a scroll event that happened in the CoordinatorLayout. We're saying yes, but usually you say only on vertical scroll or what have you.

The the next `onNestedScroll` method, actually either hides or shows the FAB depending on the direction of scroll.

Each method have default implementations that return `false` and does nothing respectively.
