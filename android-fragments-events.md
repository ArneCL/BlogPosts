title: Android: Fragments: Communicating events
date: 2012-03-24 13:30:13
tags: android,android-fragments

In your Fragment class, if you create listener on a particular interface, and make the parent implement that interface, you can communicate via events.

First create the interface:

		public interface OnNewFragmentPressed {
			void onNewFragmentPressed();
		}

Then create a listener method of that interface.

		public static class NewFragment extends Fragment {
		    private OnNewFragmentPressed mListener;
		}

Then in the onAttach() method of your Fragment, use the passed in Activity to make sure it implements the interface, and set the listener to that.

		@Override
		public void onAttach(Activity activity) {
			super.onAttach(activity);
			try {
			   mListener = (OnNewFragmentPressed) activity;
			} catch(ClassCastException e) {
			   throw new ClassCastException(activity.toString() + ” didn’t implement OnNewFragmentPressed”);
			}
		}   

Now you can call methods of that interface, thereby interacting with your parent Activity.
