title: Android: Service and Handler tutorial
tags: android, android-service

Services are long running processes, longer than say simply downloading something, that you tend to interact with, which more defines a long running process than allows it, since you still have to implement the threading of the service yourself, unless you use IntentService.

It runs in the same process as our application, unless stated, and is stopped when our Application is, unless run via startForground() in onCreate() with a Notifcation (see end of article).

First use the 'Service' as your base class (we're not dealing with IntentService in this tutorial).

    public class OurService extends Service {


Then the onCreate() method is called when the user called Context.startService(itsIntent), and no matter how many times the user calls this, only one onCreate is called while the service lives.

      @Override
      public void onCreate() {
      	super.onCreate();
      	...
      }

Then we have onStartCommand() which is passed the intent from Context.startService(). 

The last parmaeter is the service requests startId, which will be different for each time Context.startService() is called. We'll use this to kill the service.

The flags paramter can be START_FLAG_REDELIVERY, which is used in the case the service is killed before it was stopped for this startId. Or it can be Service.START_FLAG_RETRY which means the service died before this method returned.

      @Override
      public int onStartCommand(Intent intent, int flags, int startId) {
        ...    
        return Service.START_STICKY;
      }
    
The return value can be START_STICK, if we want to restart this if killed during processing although the Intent won't be redelivered, START_NON_STICK, if we don't want it automatically restarted once killed, START_REDILIVER_INTENT which is like START_STICKY but the Intent is redilivered.
    
When we want to kill the service we call Service.onStopResult(startId). Each time onStartCommand() is called we get a latest startId, so we if we call stopSelfResult with the latest id, the service will stop. If we call it with an old one it will not. This also mean we're using multiple threads we must be make sure to call this method in the correct order, or the service will be stopped prematurely.

The final method that we need to implement is onBind() which is for bound service, which we aren't dealing with in this tutorial so we can just return null.

      @Override
      public IBinder onBind(Intent intent) {
      	return null;
      }
      
    }
    
Our service doesn't actually do anything at the moment, however. Let's first fill out onCreate to give us a new thread.

    HandlerThread thread = new HandlerThread("Thread name", android.os.Process.THREAD_PRIORITY_BACKGROUND);
    thread.start();
    Looper serviceLooper = thread.getLooper();

This creates a new thread and a Looper, which will allow us to send messages to this thread, which we've given a priority (others exist, take a look.)

Now we're got a Looper we'll pass it to a Handler that sequentially processes messages in our thread, which will take in a messages we want to send.

    public class OurHandler extends Handler {
      public OurHandler(Looper looper) {
        super(looper);
      }
      
      @Override
      public void handleMessage(Message msg) {
        super.handleMessage(msg);
        int startId = msg.arg1;
        Object someObject = msg.obj;
        // Do some processing
        boolean stopped = stopSelfResult(startId);
        // stopped is true if the service is stopped
      }
    }
    
This class simply takes in our looper, and then in handleMessage looks at a Messag arg, extracts from arguments from that, does some process, and then stops the service via the startId passed into the Messager.

So let's look at our onCreate() method before we move on:

	@Override
	public void onCreate() {
		super.onCreate();
		HandlerThread thread = new HandlerThread("Thread name", android.os.Process.THREAD_PRIORITY_BACKGROUND);
		thread.start();
		Looper looper = thread.getLooper();
		Handler = new OurHandler(looper);
	}
	
Now we have this Handler, we can pass work to it from onStartCommand():

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
      if(intent != null) { // May not have an Intent is the service was killed and restarted (See STICKY_SERVICE).
        Message msg = mHandler.obtainMessage();
        msg.arg1 = startId;
        msg.obj = intent.getStringExtra("something");
        mServiceHandler.sendMessage(msg);
      }
      return START_STICKY;
    }
    
Now we obtain a Message from our Handler, put the startId and something from our Intent in it, and then pass it to the Handler.

The Handler will now sequentially process all the requests we pass via Context.startService(), and stop the service when the last one is done, only to restart, calling onCreate, it again when Context.startService is called again.

To start our Service we'd call

    context.startService(new Intent(context, OurService.class));
    
With this is our AndroidManifest.xml under the Application tag:

    <service android:name="our.package.OurService" 
      android:exported="false"
    />
  
If we did want this service to run after our application has been stopped we call startForground() in our Service's onCreate() method and give it a Notification to show.

		Notification notification = new Notification.Builder(context)
			.setSmallIcon(R.drawable.something)
			.setContentText("Content")
			.setContentTitle("Title")
			.getNotification();
		return notification;
    startForeground(17, notification); // Because it can't be zero...
    
    
