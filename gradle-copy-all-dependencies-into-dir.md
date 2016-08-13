title: Gradle: Copy all dependencies into local directory
tags: gradle,gradle-dependencies

Create a gradle build file, call it deps.gradle, as follows:

    apply plugin: 'java'
    
    repositories {
       mavenCentral()
    }
    
    dependencies {
       compile group: 'org.glassfish.jersey.bundles', name: 'jaxrs-ri', version: '2.23.1'
    }
    
    task copyDependencies(type: Copy) {
       from configurations.compile
       into 'dependencies'
    }

Then call `gradle -b deps.gradle copyDependencies` and it'll put all the dependencies into the `dependencies/` directory.
