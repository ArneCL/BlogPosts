title: Android: Gradle with UiAutomator
tags: android,android-uiautomator,gradle

UiAutomator does not directly support Gradle as yet, but you can get it to work with this gradle build file, calling in the ant file in your sdk:

	ant.properties['sdk.dir']="$System.env.ANDROID_HOME"
	ant.properties['target']='android-19'
	ant.properties['out.filename']=project.name+'_tests.jar'
	ant.properties['out.dir']=project.projectDir.toString()+'/bin/'
	ant.properties['source.dir']=project.projectDir.toString()+'/uiTests' // Or wherever your tests are


	task uiBuild() << {
		ant.project.executeTarget('build')
	}

	task uiInstall(dependsOn: ['uiBuild']) << {
		ant.project.executeTarget('install')
	}

	task uiRun(dependsOn: ['uiInstall']) << {
	    Process proc = ["adb", "shell", "uiautomator", "runtest", project.name+"_tests.jar", "-e because broken"].execute()
	    proc.consumeProcessErrorStream(System.err)
	    proc.consumeProcessOutputStream(System.out)
	    if (proc.waitFor() != 0) {
		throw new RuntimeException('exec failed')
	    }
	}

(Note: Ensure your ANDROID_HOME is set)

You should change the 'target' and 'source.dir' above to suit you.

This means you do not need to put the uiautomator files in a different directory. I am running them in my main project, under the 'uiTests' directory.

Now run it:

	$ gradle uiRun
	:uiBuild
	Android SDK Tools Revision 22.3.0
	Installed at /home/user/android-sdk-linux
	Using latest Build Tools: 19.0.0
	Project Target:   Android 4.4
	API level:        19
	input: /home/user/android-sdk-linux/tools/ant/bin/classes
	No new compiled code. No need to convert bytecode to dalvik format.
	:uiInstall
	:uiRun
	INSTRUMENTATION_STATUS: numtests=1
	INSTRUMENTATION_STATUS: stream=
	org.denevell.droidnatch.uitests._1_ListThreads:
	INSTRUMENTATION_STATUS: id=UiAutomatorTestRunner
	INSTRUMENTATION_STATUS: test=testListThreads
	INSTRUMENTATION_STATUS: class=Your.Test.Class
	INSTRUMENTATION_STATUS: current=1
	INSTRUMENTATION_STATUS_CODE: 1
	// Any System.out.println you have set
	INSTRUMENTATION_STATUS: numtests=1
	INSTRUMENTATION_STATUS: stream=.
	INSTRUMENTATION_STATUS: id=UiAutomatorTestRunner
	INSTRUMENTATION_STATUS: test=testListThreads
	INSTRUMENTATION_STATUS: class=Your.Test.Class
	INSTRUMENTATION_STATUS: current=1
	INSTRUMENTATION_STATUS_CODE: 0
	INSTRUMENTATION_STATUS: stream=
	Test results for WatcherResultPrinter=.
	Time: 11.565

	OK (1 test)


	INSTRUMENTATION_STATUS_CODE: -1

	BUILD SUCCESSFUL

	Total time: 14.871 secs

Your new uiautormator jar will now be in your /bin directory. (You can change that in the above script).

Beware, that if you have no devices attached in debugging mode, it will just return

	:uiInstall FAILED

	FAILURE: Build failed with an exception.

	* Where:
	Build file '/home/user/workspace/Natch-Android/build.gradle' line: 12

	* What went wrong:
	Execution failed for task ':uiInstall'.
	> exec returned: 1

