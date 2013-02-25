Title: Android: Waking the screen, dismissing the keyguard
{{wl-tags:android|android-wakelock|android-keyguard|android-windowflags}} {{wl-publish: 2012-12-03 06:54:54 -0500 | Denevell }}

You can wake and keep wake the screen using the old:

     mPowerManager = (PowerManager) appContext.getSystemService(Context.POWER_SERVICE);
     mWakeLock = mPowerManager.newWakeLock((PowerManager.SCREEN_BRIGHT_WAKE_LOCK 
      | PowerManager.FULL_WAKE_LOCK 
      | PowerManager.ACQUIRE_CAUSES_WAKEUP), "TAG");
     if(mWakeLock.isHeld()) {
       mWakeLock.release();
     }
     mWakeLock.acquire();

And the WAKE_LOCK permission in your manifest. And you can disable the keyguard using the old:

     KeyguardManager keyguardManager = (KeyguardManager) appContext.getSystemService(Context.KEYGUARD_SERVICE); 
     KeyguardLock keyguardLock =  keyguardManager.newKeyguardLock("Tag");
     keyguardLock.disableKeyguard();

And, again, the KEYGUARD permission.

Or you can use the easier Window flags, which require no permissions since they are only applicable to one Window:

     activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED);
     activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);
     activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD);
     activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
