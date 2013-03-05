title: Android: Fragments: Communicating between FragmentActivity and Fragment
date: 2012-03-24 12:29:13
tags: android,android-fragments

In your FragmentActivity, you can call getSupportFragmentManager().findFragmentByTag(“tag”), or findFragmentById(R.id.frag), to access the child Fragment. From there you can call its methods.

Similarly, in the Fragment, you can call getActivity() to get access to the parent FragmentActivity().      

You can also do this via events. See the android-fragments-events post.
