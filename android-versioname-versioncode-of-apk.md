title: Android: Get versionName or versionCode of an APK from the command line
tags: android,android-aapt,android-versionCode

You can use `aapt` in android's `build-tools` directory of whatever build tools version you're using.

You pass that tool the `badging` command, and then pass it the location of your APK.

Example:

    $ANDROID_HOME/build-tools/24.0.2/aapt dump badging app/build/outputs/apk/app-release.apk

If you scroll through all the output, you can find the `versionName` and `versionCode`.
