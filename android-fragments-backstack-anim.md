title: Android: Fragments: Replacing with back stack and animation
date: 2012-03-24 12:28:13
tags: android,android-fragments

You can replace an existing fragment, like you added one. But this time with a back stack, meaning pressing back reverts to transaction, and some simple animations.

You can, however, only delete and replace fragments which you’ve added via the FragmentManager, not ones you’ve initiated using XML.
Call this code to replace an existing Fragment you added with another.

		FragmentManager fragManager = getSupportFragmentManager();
		FragmentTransaction fragTransaction = fragManager.beginTransaction();
		fragTransaction.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN);
		NewFragment f = new NewFragment();
		fragTransaction.replace(R.id.frag_container1, f);
		fragTransaction.addToBackStack(null);
		fragTransaction.commit();

(If you’re in a Fragment, and not a FragmentActivity, replace getSupportFragmentManger wiht getFragmentManager.)

Note we’re setting a transition, TRANSIT_FRAGMENT_OPEN. And we’re added it to a back stack. So we we press back this transition is reversed.
