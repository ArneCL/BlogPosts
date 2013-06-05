Tags: gradle,gradle-dependencies
Title: Gradle: Project dependencies like in Eclipse

One project may depend on another. And that other project may be at the same level, i.e. not a in a subdirectory. 

This is easily achieved in Eclipse. And also in Gradle.  Yout need Gradle's 'flat includes'.

In your project, create a settings.gradle fil, with a 'includeFlat' directive inside.

		includeFlat 'AProject'

Your your build.gradle specify this is needed during compile time in the dependencies section (or testCompile etc if needs be).

		dependencies {
			compile project(':AProject')
		}

Now when you compile you will pull in that project. Obviously AProject needs to be a Gradle project.

Note that this will only pull in the compile files in AProject - nothing under the /test directory.
