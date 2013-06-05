Tags: gradle,gradle-dependencies
Title: Gradle: Project dependencies like in Eclipse

One project may depend on another, which may be on the folder same level, i.e. not a in a subdirectory. 

This is easily achieved in Eclipse. And also in Gradle.  You need Gradle's 'flat includes'.

In your project, create a settings.gradle file, with a 'includeFlat' directive inside to incldue a project called 'AProject'.

		includeFlat 'AProject'

In your build.gradle specify this as needed during compile in the dependencies section (or set as needed during test etc if needs be).

		dependencies {
			compile project(':AProject')
		}

Now when you build you will pull in that project. Obviously AProject needs to be a Gradle project.

Note that this will only pull in the compile files in AProject - nothing under the /test directory.
