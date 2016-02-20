title: Android Design Library: CoordinatorLayout basics
tags: android,android-coordinatorlayout

Now Android has the 'SnackBar' which popups up at the bottom of the screen, it may overlap some of your other elements. The Design library has introduced the CoordinatorLayout to deal with these situations

It allows you to align the elements via `android:layout_gravity` and has a `app:layout_behavior` attribtue that takes in the full path of a class such as `com.example.blar.myapplication.FloatingActionButtonBehaviour`.

That class extends a `Behavior` which is typed to your view type. It checks if the layout depends on something like a `SnackbarLayout`, and if so performs a transformation on your view, like animating it out of the way.

He's an example of a Behavior which is typed to a Custom View and moves that out of the way when a SnackBarLayout appears:

    package com.example.blar.myapplication;
    
    import android.content.Context;
    import android.support.design.widget.CoordinatorLayout;
    import android.support.design.widget.Snackbar;
    import android.util.AttributeSet;
    import android.view.View;
    
    public class FloatingActionButtonBehaviour extends CoordinatorLayout.Behavior<SavingViewStateViewPager> {
    
        public FloatingActionButtonBehaviour(Context context, AttributeSet attrs) {}
    
        @Override
        public boolean layoutDependsOn(CoordinatorLayout parent, SavingViewStateViewPager child, View dependency) {
            return dependency instanceof Snackbar.SnackbarLayout;
        }
    
        @Override
        public boolean onDependentViewChanged(CoordinatorLayout parent, SavingViewStateViewPager child, View dependency) {
            float translationY = Math.min(0, dependency.getTranslationY() - dependency.getHeight());
            child.setTranslationY(translationY);
            return true;
        }
    }
