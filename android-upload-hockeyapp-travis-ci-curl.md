title: Android: Upload to HockeyApp on every Travis-CI build
tags: travis-ci,hockeyapp,android

I assume you have setup [HockeyApp](https://newfivefour.com/android-hockeyapp-continuous-deployment.html), that you have setup [Travis-CI](https://newfivefour.com/android-setup-travis-ci.html) and that you have a build which is signed with a [constant keystore signature](https://newfivefour.com/android-debug-build-constant-signed-keystore.html).

If our build is created by the above link, we will need the `CI_KEYSTORE_PASSWORD` environmental variable to sign the build. Go to your application settings in Travis-CI and create the environmental variable. (Ensure you have not toggled "display value in build log" for privacy)

Now go to account settings on the HockeyApp site, and then click API Tokens and create one with upload access to your application. With that, go to your application on Travis-CI and add another environmental variable, `HOCKEYAPP_TOKEN`.

Now we have `HOCKEYAPP_TOKEN` available in our Travis-CI environment, we can add a `curl` command to our .travis.yml script section to upload our signed build to HockeyApp:

    script:
      ...
      - >
        curl
        -F "status=2"
        -F "notify=1"
        -F "notes=Some new features and fixed bugs."
        -F "notes_type=0"
        -F "ipa=@app/build/outputs/apk/YOUR_SIGNED_BUILD.apk"
        -H "X-HockeyAppToken: $HOCKEYAPP_TOKEN"
        https://rink.hockeyapp.net/api/2/apps/upload

Now on every build, we'll upload the APK to HockeyApp, using our `HOCKEYAPP_TOKEN`, for distribution to our testers.

Note: We are not automatically updating the android `versionCode`, although putting `versionCode System.getenv("TRAVIS_BUILD_NUMBER") as Integer ?: 999` will do that, and the version notes are static, which we can approach in another tutorial.
