title: Android: Databinding and ViewPagers
tags: android,android-databinding,android-viewpager

Once you have a data binding, you will want to use it with a `ViewPager` eventually.

The `ViewPager` inflates layouts. But if you want to inflate layouts with the `<data></data>` section under a `<layout>` tag, you must change your layout inflation code.

In `instantiateItem()`:

    YourLayout layout = DataBindingUtil.inflate(LayoutInflater.from(MainActivity.this), "R.layout.your_layout", container, false);
    // Set your databinding up here
    container.addView(layout.getRoot());
    return layout.getRoot();

The `getRoot()` method is there because data binding won't return the actual layout, but the binding. But `getRoot()` will give you the layout.

If you have dynamic layouts, i.e. it's not always "R.layout.your_layout", then you won't always return `YourLayout`. You can instead return a `ViewDataBinding`.

But the problem with the above is now you can't bind variables to that Binding, instead you'll have to cast it to the appropriate generated class:

    if(layouts[position]==R.layout.some_layout) {
      SomeLayoutBinding slb = DataBindingUtil.bind(db.getRoot());
      slb.setThing("Hoooo!");
    }
