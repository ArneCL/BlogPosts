title: Android: Sign your Android app from the command line with an external signing file and Gradle
tags: android,gradle

I'm assuming in your in your app's `app` directory, you've made a signing key and you're using Gradle 2.10 or above.

In your gradle file, withing `android`, insert this. 
  
    signingConfigs {
    	release {
        	storeFile file(props['keystore'])
                storePassword props['keystore.password']
                keyAlias props['keyAlias']
                keyPassword props['keyPassword']
        }
      buildTypes {
          release {
              signingConfig signingConfigs.release
          }
      }
    }

Then in the file referenced as `keystore.password`, insert this:

    keystore=android.key
    keystore.password=YOURSTOREPASSWORD
    keyAlias=YOURKEYALIAS
    keyPassword=YOURKEYPASSWORD

The `android.key` refers to the key file. And the rest is as you entered in your signing key.

Now you can run `gradle assembleRelease` and **not** upload your `keystore.password` file.
