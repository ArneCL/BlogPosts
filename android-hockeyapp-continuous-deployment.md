title: Android: Continuous Deployment with HockeyApp
tags: android,hockeyapp

Continuous Deployment is automatically distributing new app to your testers, and automatically reporting crashes. This guide shows you how to use HockeyApp for the distribution aspect.

I'm going to assume you've got a basic Android App in development.

0. First, sign up to https://HockeyApp.net
0. Click add new app, and choose to add it manually
0. Give it the same package name as appears in your `AndroidManifest.xml`
0. Now it's created, click on integrate HockeyApp quick tutorial. It will tell you add these parts to your app:
   
   app/build.gradle:
      
        repositories {
          ...
          jcenter()
          ...
        }
        
        android {
          ...
          defaultConfig {
            ...
            manifestPlaceholders = [HOCKEYAPP_APP_ID: "IT_WILL_TELL_YOU_YOUR_APP_ID"]
            ...
          }
          ...
        dependencies {
          ...
          compile 'net.hockeyapp.android:HockeySDK:4.0.1'
          ....
        }      
   
   app/src/main/AndroidManifest.xml (within the application tag):
   
        <meta-data android:name="net.hockeyapp.android.appIdentifier" android:value="${HOCKEYAPP_APP_ID}" />
   
   In your Activity:
   
        @Override
        public void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          // Your own code to create the view
          // ...
      
          checkForUpdates();
        }
      
        @Override
        public void onResume() {
          super.onResume();
          // ... your own onResume implementation
          checkForCrashes();
        }
      
        @Override
        public void onPause() {
          super.onPause();
          unregisterManagers();
        }
      
        @Override
        public void onDestroy() {
          super.onDestroy();
          unregisterManagers();
        }
      
        private void checkForCrashes() {
          CrashManager.register(this);
        }
      
        private void checkForUpdates() {
          // Remove this for store builds!
          UpdateManager.register(this);
        }
      
        private void unregisterManagers() {
          UpdateManager.unregister();
        }
0. Now build and install that on your phone, and upload the APK to HockeyApp via the upload version button, clicking through all the dialog boxes until you can see the version on the Overview.
0. Now change something in the app, like some text, and update the `versionCode` in `app/build.grade`. Build it, but *do not install this to your device* (so we can see automatic updates on our phone - you don't normally do this)
0. With this newly build version, upload it to HockeyApp as before.

Now when you open the app again, or do something to trigger `onResume()`, it will ask you if you want to update to the latest version.

Click `update`, and voila - you and your testers will see the newest app, and any crashes will be reported to you with a stacktrace and device information.

We don't yet automatically upload our APK to HockeyApp via a build server / continuous integration environment, or send up the release notes, but we can do that in a later tutorial.
