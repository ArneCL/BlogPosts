title: Scala: Using gradle to build your project
tags: scala,gradle

If you want to use gradle to compile scala, ensure you have gradle, either in your system or via the gradle wrapper.

Create this build.gradle file:

    apply plugin: 'scala'
    
    repositories {
        mavenCentral()
    }
    
    dependencies {
      compile 'org.scala-lang:scala-library:2.11.6'
      // Your other deps here
    }
    
    sourceSets.main.scala.srcDirs = ['.']

This includes the scala library needed to compile, 2.11.6 is the latest scala at time of writing.

It also changes the defautl scala source file location to the current directory, but if you're using `src/main/scala` there's no need for this line.

Finally you have run `gradle build` or `./gradlew build` if you're using the gradle wrapper.
