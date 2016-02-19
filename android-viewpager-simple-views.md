title: Android: Simple ViewPager with Views
tags: android,android-viewpager

You can quickly and easily use a ViewPager with views--instead of fragments--by first setting its XML:

    <android.support.v4.view.ViewPager
        android:id="@+id/viewpager"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
    </android.support.v4.view.ViewPager>

And then setting its adapter.     
    
    ViewPager mViewPager = (ViewPager) findViewById(R.id.viewpager);
    mViewPager.setAdapter(new PagerAdapter() {
        String[] titles = {"Eins", "Zwei", "Drei"};
        int[] layouts = {R.layout.layout1, R.layout.layout2, R.layout.layout3};

        @Override
        public Object instantiateItem(ViewGroup container, int position) {
            LayoutInflater inflater = LayoutInflater.from(MainActivity.this);
            ViewGroup layout = (ViewGroup) inflater.inflate(layouts[position], container, false);
            container.addView(layout);
            return layout;
        }

        @Override
        public void destroyItem(ViewGroup container, int position, Object object) {
            container.removeView((View)object);
        }

        @Override
        public CharSequence getPageTitle(int position) {
            return titles[position];
        }

        @Override
        public int getCount() {
            return layouts.length;
        }

        @Override
        public boolean isViewFromObject(View view, Object object) {
            return view == object;
        }
    });

Note, we're setting the layouts as IDs, and initialising them in the initantiateItem method. 

We include titles, but they won't show on their own. We'll use them with a `TabLayout` next.
