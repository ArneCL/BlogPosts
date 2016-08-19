title: Gradle: Generate POM file etc with the maven plugin
tags: gradle,maven,pom

The maven plugin lets us install a maven package, the pom file etc, to a repository. The default repository is our local file system.

Let's say we're building a Java project, here's the build script. It's as normal, except for the `archivesBaseName`, `group` and `version`.

    apply plugin: 'java'
    apply plugin: 'maven'
    
    repositories {
        mavenCentral()
    }
    
    dependencies {
      ...
    }
    
    archivesBaseName = 'jersey-json-wadl'
    group = 'com.newfivefour'
    version = '0.0.1'

Now if we do `./gradew install` (I'm assuming you're using the gradle wrapper), it will install this to `~/.m2/repository/com/newfivefour/jersey-json-wadl/0.0.1/`.

Within that directory you'll have your POM file and the generated JAR. In the directory above that, there's a `maven-metadata-local.xml` file that documents the versions and last updated time amoung other things.

If you run `./gradlew install` again with a new `version` attribute, you'll get a new directory above, this time named `0.0.2` for example.
