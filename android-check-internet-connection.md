title: Android: Check for an internet connection
tags: android,android-connectivity

Stick this in your `Application` class:

    public static App sApp;
  
    @Override public void onCreate() {
      super.onCreate();
      sApp = this;
    }

    public static boolean isNetworkAvailable() {
      ConnectivityManager cm = (ConnectivityManager) sApp.getSystemService(Context.CONNECTIVITY_SERVICE);
      NetworkInfo netInfo = cm.getActiveNetworkInfo();
      return netInfo != null && netInfo.isConnectedOrConnecting();
    }

You also need this permission:

    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

This does not, however, check the internet connection is good: i.e. it may not be able to connect to anything. For that, you'd have to check a connection to another site. 
