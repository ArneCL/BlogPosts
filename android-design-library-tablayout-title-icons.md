title: Android Design Library: TabLayout, ViewPager and title icons
tags: anddroid,android-tablayout,android-viewpager

The TabLayout's XML is simple enough:

    <android.support.design.widget.TabLayout
        android:id="@+id/tabLayout"
        app:tabMode="fixed"
        app:tabGravity="fill"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
    </android.support.design.widget.TabLayout>

In this case, we use `fixed` and `fill` to indicate the tabs should take up all the width. If you've got a load you can use `scrollable` with `tabMode`.

Next we can programmatically set the tabs and their icons:

    TabLayout mTabLayout = (TabLayout) findViewById(R.id.tabLayout);
    mTabLayout.addTab(mTabLayout.newTab().setText("Hiya").setIcon(android.R.drawable.ic_secure));
    mTabLayout.addTab(mTabLayout.newTab().setText("Again Sup").setIcon(android.R.drawable.ic_secure));
    mTabLayout.addTab(mTabLayout.newTab().setText("Yeah").setIcon(android.R.drawable.ic_secure));
    mTabLayout.addTab(mTabLayout.newTab().setText("Sup man").setIcon(android.R.drawable.ic_secure));
    mTabLayout.addTab(mTabLayout.newTab().setText("I'm just saying stuff innit").setIcon(android.R.drawable.ic_btn_speak_now));

But if we have a ViewPager, as in the last tutorial, we can use that, and the titles you specified in such, to control the TabLayout  instead:

    mTabLayout.setupWithViewPager(mViewPager);

The problem now is that the `ViewPager`'s titles include no icons. To resolve this, in the `ViewPager` adapter, we can now return, not a string from `getPageTitle`, but a Spannable:

    @Override
    public CharSequence getPageTitle(int position) {
        Drawable image = ContextCompat.getDrawable(MainActivity.this, images[position]);
        image.setBounds(0, 0, image.getIntrinsicWidth(), image.getIntrinsicHeight());
        SpannableString sb = new SpannableString(" " + titles[position]);
        ImageSpan imageSpan = new ImageSpan(image);
        sb.setSpan(imageSpan, 0, 1, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        return sb;
    }

For the above to work you need to disable `textAllCaps` on the  `tabTextAppearance` property. This means you need a `theme` property on the `TabLayout` XML that points to a style.

The above, including many other styles you can use, is below:

    <style name="MyCustomTabLayout" parent="Widget.Design.TabLayout">
      <item name="tabMaxWidth">@dimen/tab_max_width</item>
      <item name="tabIndicatorColor">?attr/colorAccent</item>
      <item name="tabIndicatorHeight">2dp</item>
      <item name="tabPaddingStart">12dp</item>
      <item name="tabPaddingEnd">12dp</item>
      <item name="tabBackground">?attr/selectableItemBackground</item>
      <item name="tabTextAppearance">@style/MyCustomTabTextAppearance</item>
      <item name="tabSelectedTextColor">?android:textColorPrimary</item>
    </style>
    <style name="MyCustomTabTextAppearance" parent="TextAppearance.Design.Tab">
      <item name="android:textSize">14sp</item>
      <item name="android:textColor">?android:textColorSecondary</item>
      <item name="textAllCaps">false</item>
    </style>
