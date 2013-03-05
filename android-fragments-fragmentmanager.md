title:  Android: Fragments: adding new ones via FragmentManager
date: 2012-03-24 12:27:13
tags: android,android-fragments,android-FragmentManager

FragmentManager will allow us add, replace, fragments, control and listen on a fragment’s back stack, find a fragment by id or tag.
We’ll use it to add one. First create an empty ViewGroup in our layout file.

		<FrameLayout android:id=”@+id/frag_container1”
			android:layout_width=“match_parent” 
			android:layout_height=“wrap_content”>
		</FrameLayout>

Then in the onCreate() method of our FragmentActivity call up a FragmentManger, call up a FragmentTransaction to add a new fragment, create a new Fragment (the same we created last tutorial), then add and commit the change.

		FragmentManager fragManager = getSupportFragmentManager();
		FragmentTransaction fragTransaction = fragManager.beginTransaction();
		OtherFragments f = new OtherFragments();
		fragTransaction.add(R.id.frag_container2, f);
		fragTransaction.setBreadCrumbTitle(“hello”);
		fragTransaction.commit();

Now our new Fragment will reside in the ViewGroup we created.

If you add it with add(fragment, string) you add a new fragment without a UI. The string is a tag that you can use to get access to it again, via the FragmentManager.
