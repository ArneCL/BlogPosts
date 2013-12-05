title: Android: Gradle with UiAutomator
tags: android,android-uiautomator,gradle

UiAutomator does not directly support Gradle as yet, but you can get it to work with this gradle build file, calling in the ant file in your sdk:

		ant.properties['sdk.dir']="$System.env.ANDROID_HOME"
		ant.properties['target']='android-19'
		ant.properties['out.filename']=project.name+'_tests.jar'
		ant.properties['source.dir']=project.path+'uiTests' // Or wherever your tests are
		ant.importBuild "$System.env.ANDROID_HOME"+'/tools/ant/uibuild.xml'

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
