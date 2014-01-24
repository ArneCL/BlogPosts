title: Android: Find your debug key for Google maps 2.0 in Linux
tags: android, android-maps, android-debug-key

First use Java's keytool program to generate the SHA1 key:

    /usr/lib/jvm/java-7-oracle/bin/keytool -list -alias androiddebugkey -keystore /home/YOURUSERNAME/.android/debug.keystore -storepass android -keypass android

This should give you something like 

    androiddebugkey, 22-Jan-2014, PrivateKeyEntry, 
    Certificate fingerprint (SHA1): 72:A5:F8:A0:...

Then go https://cloud.google.com/console/project/348075870621/apiui/credential (works on 22 Jan 2014). 

If you haven't already, go to create new key and choose 'Android'. Then under the allowed application bit enter 72:A5:F8:A0:...:YOUR.PACKAGE.NAME, with the first part the SHA1 got got above, and the package name the name in your AndroidManifest.xml file.

On that same page, it'll give you a API Key. Put that in your Android Manifest as under the Application tag showen:

        <meta-data
            android:name="com.google.android.maps.v2.API_KEY"
            android:value="YOUR_API_KEY"
            />

You need to do this for each machine you build the application on, i.e. get the debug key, generate the fingerprint and tell Google about it on the above URL.
