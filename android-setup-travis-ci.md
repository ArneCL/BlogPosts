title: Android: Setup Travis-CI
tags: android,travis-ci


Travis CI is a free continuous integration environment--i.e a container that download everything it needs to build your android project and then builds (and opitionally tests) it--for open source projects.

0. Create a new Android project using a basic template in Android Studio. I'm using Android Studio 2.1.1.
0. Optionally add this to your `app/build.gradle` file so travis-ci doesn't fail on lint errors that may not appear locally if your environment is differnt 
    
         android {
           lintOptions {
               abortOnError false
           }
         }

0. Create a new github project for that and upload your project there, including the gradle wrapper.
0. Now goto https://travis-ci.org and login by pressing the login with your github account button.
0. Click add new repository on travis-ci. Press the sync account button at the top. Now you should be able to enable travis-ci for your new repo by pressing the toggle swich.
0. In your `app/build.gradle` file note the `BuildToolsVersion` you're using and the `targetSdkVersion`
0. Create a file called `.travis.yml` in your repo and upload it to github
   
         language: android
         java: oraclejdk8 # We need this if your sdk version is 24
         android:
           components:
             # Uncomment the lines below if you want to
             # use the latest revision of Android SDK Tools
             - platform-tools
             - tools
             
             # The BuildTools version used by your project
             - build-tools-YOUR_NOTED_BUILD_TOOLS_VERSION
             
             # The SDK version used to compile your project
             - android-YOUR_NOTED_TARGET_SDK_VERSION
             
             # Additional components
             #- extra-google-google_play_services
             - extra-google-m2repository
             - extra-android-m2repository
             - addon-google_apis-google-19
          
         script:
           - ./gradlew build

Now refresh https://travis-ci.org/ and you should see your project building eventually. Click on the `#YOURBUILDNUMBER started` or `#YOURBUILDNUMBER` text and you'll be able to follow the console, watching your project build.

You can now add a fun button to your `README.md` showing your project has built via:

      [![Build Status](https://travis-ci.org/YOURGHUSERNAMEr/YOURPROJECTNAME.svg?branch=master)](https://travis-ci.org/YOURGHUSERNAMEr/YOURPROJECTNAME)

Optionally, if you want to see the lint XML file in travis's console, add this after the `- ./gradle build` line:

     - cat /home/travis/build/YOURTRAVISUSERNAME/YOURPROJECTNAME/app/build/outputs/lint-results-debug.xml
