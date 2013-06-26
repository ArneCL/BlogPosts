Title: Android: Save ListView position after rotation or backpress
tags: android, android-list

You can restore the position and state of a ListView by saving the ListView's instance state. 

You then restore it after the ListView's adapter is next set.

**Restoring it after rotation:**

Save the ListView state on onSaveInstanceState:

    @Override
    public void onSaveInstanceState(Bundle outState) {
      super.onSaveInstanceState(outState);
          outState.putParcelable(LIST_INSTANCE_STATE, yourListView.onSaveInstanceState());
    }
    
Then later, get that back out of the Bundle in onCreate:

    @Override
    public void onCreate(Bundle savedInstanceState) {
    	super.onCreate(savedInstanceState);
    	if(savedInstanceState!=null) {
              mListInstanceState = savedInstanceState.getParcelable(LIST_INSTANCE_STATE);
    	}
    }
    
Then, after the ListView's adapter is set, you can restore the instance state:

    mListView.onRestoreInstanceState(mListInstanceState);
    
**Restoring it after a backpress:**
    
If on after a backpresss your ListView is recreated via onResume(), then

1. Ensure you save the instance state on onPause() instead, or in addition, to the above.
2. Restore the instance state as above.
