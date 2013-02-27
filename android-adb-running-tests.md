Title: Running tests on Android through adb
Tags: android|android-adb|android-testing|ant|ant-exec
Date: 2012-12-01 16:28:11 -0500 
Author: Denevell


Although you can run test through Eclipse and via Ant, running them directly though adb is often the best option since 

* when you're running them on a build server Eclipse's method won't be available to you, and; 
* the default ant 'test' target doesn't take into account non-standard source directories or non-standard test runners for example.

It's simply enough using adb, as soon as you've installed the test project on your device/emulator:

    adb shell am instrument -w your.test.project.package/android.test.InstrumentationTestRunner

The -w tag tells it to wait and print out the results. The package is what you've defined in the AndroidManifest.xml in your Android test project. The text after that is the test runner, the default one in this case.

The default test runner does not output junit XML format, unforunately. But there are alternatives, such as https://code.google.com/p/the-missing-android-xml-junit-test-runner/  If you do use this, then your adb command will be, after you've included the jar in your test projects's build:

    adb shell am instrument -w your.test.project.package/pl.polidea.instrumentation.PolideaInstrumentationTestRunner

Then you can use another build target to get the XML junit data off the device, which is located in the data/data/your.app/files directory by default.

Of course, you can put the above command in an ant target:

     <target name="instrument">
        <echo level="info">Running instrumentation tests</echo>
          <exec executable="adb" failonerror="true">
               <arg value="shell" />
               <arg value="am" />
               <arg line="instrument -w your.test.package/pl.polidea.instrumentation.PolideaInstrumentationTestRunner" />
          </exec>
     </target>

To pull the XML junit files, these ant commands will help:

      <mkdir dir="junit-results" />
      <exec executable="adb" failonerror="true" dir="junit-results">
          <arg value="pull" />
          <arg value="/data/data/your.actual.apps.package/files/" />
      </exec>

