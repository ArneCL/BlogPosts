title: Android: Fragments setup
date: 2012-03-24 12:25:13
tags: android,android-fragments

Create a layout file as normal. But this time with a <fragment> tag in it. It ‘name’ is a static public class we’ll shortly make.

		<?xml version=“1.0” encoding=“utf-8”?>
		<LinearLayout xmlns:android=“http://schemas.android.com/apk/res/android”
		    android:layout_width=“fill_parent”
		    android:layout_height=“fill_parent”
		    android:orientation=“vertical” >
		    <fragment android:name=”your.activity.namespace$OurFragment”
			    android:layout_width=“match_parent” 
			    android:layout_height=“wrap_content” /> 
		</LinearLayout>

Then in your ‘Activity’ change its base class to FragmentActivity.

		public class OurExample extends FragmentActivity {

Now create a new public static class in this file. Note it has the same name (and be very careful you name it the same, lest badly title exceptions will come to haunt you) as the <fragment> tag above.

		public static class OurFragment extends Fragment {
		     @Override
		     public View onCreateView(LayoutInflater inflater, ViewGroup container,
		     Bundle savedInstanceState) {    
			return inflater.inflate(R.layout.fraglayout, container, false);
		     }
		}

Its one required method, onCreateView, will return a normal inflated layout file for its view. It has other lifecycle methods, which can be found in the docs.
