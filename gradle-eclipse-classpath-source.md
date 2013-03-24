title: Gradle: Generate your .classpath with sources
tags: gradle,gradle-eclipse

One of the nice features of Gradle is that the eclipse plugin will generate your .classpath for you and will fetch the sources for all the dependencies that you have specified.

This comes by default by running 'gradle eclipse', but you can also run it separately, thereby not modifying any of your other eclipse project files:

		gradle eclipseClasspath

You obviously have to "apply plugin: 'eclipse'" at the top of your build.gradle file.
