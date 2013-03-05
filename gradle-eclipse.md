Title: Gradle: Using Eclipse
Tags: gradle,gradle-eclipse

If you put 

        apply plugin:'eclipse'

at the top of your build.gradle file you can run 'gradle eclipse' which will generate the Eclipse project files, including the .classpath.

If you want to change the source and target compatibility settings:

        eclipse {
          jdt {
            sourceCompatibility = 1.6
            targetCompatibility = 1.6
          }
        }
