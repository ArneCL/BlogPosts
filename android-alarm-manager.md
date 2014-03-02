title: Android: Using the AlarmManager
tags: android, android-alarm-manager

If you want to schedule tasks, you need to use an AlarmManager.

First you create a PendingIntent with the BroadCastReceiver you want to call with this alarm.

    Intent i = new Intent(getApplicationContext(), YourBroadcastReceiver.class);
    PendingIntent pi = PendingIntent.getBroadcast(getApplicationContext(), 0, i, 0);

The first parameter is a flag that's currently not used by the system, and the last is a PendingIntent flag which specifies how the PendingIntent should work regarding other PendingIntents, PendingIntent.FLAG_CANCEL_CURRENT cancels any current pendingintents of the type for example.

Next let's get a reference to our AlarmManager and schedule it for every 30 seconds.

    AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
	  am.setRepeating(AlarmManager.RTC, System.currentTimeMillis(), 30000, pi);

The second paramter to setRepeating is the time it should go off initially, no in this instance, and then the perioud at which it repeats, every 30 seconds, and then our pending intent to launch.

The first paramter is simply the real time clock, if we did RTC_WAKEUP it'd wake the phone up to launch the broadcast (we'd also need the wake up permissions in our app). We could also used elapsed time since boot, optionally with a wake up.
