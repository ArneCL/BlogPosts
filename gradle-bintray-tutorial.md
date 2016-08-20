title: Gradle: Bintray tutorial
tags: gradle,bintray

We can use gradle to upload our project as a maven repository to bintray, and by extention jcenter and mavenCentral.

Sign up to at https://bintray.com. Create a repository, let's say we call it `wonderful`.

Now let's create the `build.gradle` file giving a buildscript repository, adding the bintray plugin, and applying the `java`, `maven` and `maven-publish` plugins. 

    buildscript {
      repositories {
        jcenter()
      }
    }
    
    plugins {
      id "com.jfrog.bintray" version "1.7"
    }
    
    apply plugin: 'java'
    apply plugin: 'maven'
    apply plugin: 'maven-publish'

Now let's add the standard version, archivesBaseName and group. We'll reference this as `project.version` etc later on.

    archivesBaseName = 'jersey-json-wadl'
    group = 'com.newfivefour'
    version = '0.0.1'
    description = 'Something, innit'

The `maven-publish` plugin allows us to define a `publishing.publications` maven block. This defines what we're publishing (java components), the groupId, the artifactId and the version. 

We're using the previously defined project version value etc above. And the publication is called `MyPublication`.

    publishing {
      publications {
          MyPublication(MavenPublication) {
              from components.java
              groupId = project.group
              artifactId = project.archivesBaseName
              version = project.version
          }
      }
    }

Now let's create the `bintray` block. We get our bintray user and api key from the system environment, and we reference the name of the publication created above, and we tell bintray to publish the artifcat, instead of holding it on bintray waiting for us to press 'publish'.

    bintray {
        user = System.getenv('BINTRAY_USER')
        key = System.getenv('BINTRAY_KEY')
        publications = ['MyPublication']
        publish = true
        pkg ...
    }

The `pkg` part is where things get interesting: 

        pkg {
            repo = 'wondeful'
            name = 'somerandomname'
            licenses = ['Apache-2.0']
            vcsUrl = 'https://github.com/newfivefour/jerseyjsonwadl.git'
            version {
                name = project.version
                desc = project.description
                released  = new Date()
            }
        }

We define the `repo` name we created on bintray. We give it a `name`, or a `package` as it will appear on the bintray UI. We also specify the licence and VCS url. The `version` block reuses the `version`, `desc` from our project and we set the release date to now.

We can now run `./gradlew install`. This doesn't do any bintray stuff, but in your `~/.m2/repository/~/.m2/repository/com/newfivefour/jersey-json-wadl/` directory you should see our maven repository.

Finally, running `./gradlew --no-daemon bintrayUpload` (we're using `--no-daemon` since the daemon is buggy and keeps old values) will upload our repository. Wait a few seconds, and our maven repository should start to appear at `https://YOURUSERNAME.bintray.com/wonderful/`.

Now, in another gradle project, if you define a repository via `  maven { url "http://dl.bintray.com/YOURUSERNAME/wonderful" }` you can call a dependency called `compile 'com.newfivefour:jersey-json-wadl:0.0.1'`.
