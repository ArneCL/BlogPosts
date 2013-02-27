Title: Android: Intent Service
Tags: android|android-service|android-intent-service
Date: 2013-01-09 15:11:48 -0500 
Author: Denevell

You can call a Intent service like so:

     Intent intentService = new Intent(this, IntentServiceExample.class);
     intentService.putExtra(IntentServiceExample.STRING_TO_OUTPUT, "Stuff");
     startService(intentService);

This pre supposes a IntentServiceExample class, which you first need to define in your AndroidManifest.xml

     <service android:name="its.package.IntentServiceExample" android:exported="true"/>

The class looks like so

      public class IntentServiceExample extends IntentService {
            private static final String TAG = IntentServiceExample.class.getSimpleName();
            public IntentServiceExample() {
                super("ExampleIntentService");
            }
     
            @Override
            protected void onHandleIntent(Intent intent) {
              // Code goes here
            }
      }

All the action happens in onHandleIntent(). You can get the passed in bundle value via:

     String s = intentService.getStringExtra(STRING_TO_OUTPUT);

And do anything else you wish. To communicate back with the activity you can pass in a PendingIntent to give the service something to talk to your Activity with:

     PendingIntent pix = PendingIntent.getBroadcast(
      this,
      0,
      new Intent(this, OurBroadcastReceiver.class),
      PendingIntent.FLAG_UPDATE_CURRENT);
 
     intentService.putExtra(IntentServiceExample.KEY_PENDING_INTENT, pix);

The OurBroadcastReceiver is the class where you will receive whatever the services tells you via a passed in Intent:

     public static class OurBroadcastReceiver extends BroadcastReceiver {
            @Override
            public void onReceive(Context arg0, Intent arg1) {
              String s = arg1.getStringExtra("something"));
            }
     }

You use the pending intent on the service side like so:

     PendingIntent pi  = intent.getParcelableExtra(KEY_PENDING_INTENT);
      
     Intent i = new Intent(); 
     i.putExtra("something", "some text");
     pi.send(applicationContext, 0, "something");

And then the broadcast receiver will receive it.
