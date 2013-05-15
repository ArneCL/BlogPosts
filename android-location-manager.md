Title: Android: Getting location updates
Tags: android|android-location

Firstly get a location manager, say what location provider you want, in this case, it is the network provider not the GPS. The next two values are hints about the minimum time to check between each and the next is the location that must be travelled to get a new position. Zero on each says get it as soon as possible and get the new location however soon. The final is a listener.  

		LocationManager locationManager = (LocationManager) applicationContext.getSystemService(Context.LOCATION_SERVICE);
		locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, locationListener);

The location listener will tell you when you get a new location:

		LocationListener locationListener = new LocationListener() {
		    public void onLocationChanged(Location location) {
		    }

		    public void onStatusChanged(String provider, int status, Bundle extras) {}

		    public void onProviderEnabled(String provider) {}

		    public void onProviderDisabled(String provider) {}
		  };

The location changed method is called when we get a location. The next three are when the provider changes status, is enabled or disabled.

Note, that if we already have a location, and you've set this to only callback when there's a certain distance moved, then it won't necessarily callback at all.

If you want a location regardless, then you can get the last known location:

		Location lastKnown = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);

You need the permission for the NETWORK_PROVIDER, only coarse location, not fine as GPS would require:

		<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

