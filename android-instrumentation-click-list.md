title: Android testing: Click an item in a ListView
tags: android,android-testing, android-robotium

There are two ways to do this. The Andrioid instrumentation and the Robotium way.

    final ListView listLiew = (ListView) activity.findViewById(R.id.your_list_view);
    runTestOnUiThread(new Runnable() {
    	@Override
    	public void run() {
    		listLiew.performItemClick(listLiew, POSTITION_IN_LIST, listLiew.getItemIdAtPosition(POSTITION_IN_LIST));
    	}
    });
    
You get a reference to the list view, and call performItemClick.

Robotium is simpler, using just 

    solo.clickInList(POSITION_IN_LIST, LIST_NUMBER_IN_PAGE); 
    
This means you must know what number the list is in your page -- which you may not be able to be sure of easily. 

Obviously if you just have one list, then this method works the best. 

The source of Robotium's method is at: https://github.com/jayway/robotium/blob/master/robotium-solo/src/main/java/com/jayway/android/robotium/solo/Clicker.java
