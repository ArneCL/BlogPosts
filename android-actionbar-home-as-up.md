title: Android: ActionBar home up button
date: 2012-04-7 12:35:13
tags: android,android-actionbar

To create a little back or up icon near your icon on the action bar, call getActionBar().setDisplayHomeAsUpEnabled(true);

In the onMenuItemSelected method, listen for the android.R.id.home item. Then either finish() the activity to go back to previous one, or start a new activity if you want.

		@Override

		public boolean onMenuItemSelected(int featureId, MenuItem item) {

		    switch (item.getItemId()) {

				case android.R.id.home:

					//finish();

					return true;	    

				default:

					break;

			}

		    return super.onMenuItemSelected(featureId, item);

		}
