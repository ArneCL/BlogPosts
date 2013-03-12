Tags: gradle,gradle-dependencies
Title: Gradle: Dependencies

You can specify both the repositories - maven central here - and the dependencies easily enough:

                apply plugin: 'java'    
                
                repositories {
                        mavenCentral()
                }
                
                dependencies {
                        compile 'com.github.spullara.mustache.java:compiler:0.8.10'
                        compile 'org.pegdown:pegdown:1.2.1'
                        compile 'org.eclipse.jgit:org.eclipse.jgit:2.2.0.201212191850-r'
                        compile 'org.reflections:reflections:0.9.8'
                }
        
You need the java plugin lest it won't understand the compile line.

If you want to specify if something is transitive or not, you'll have to use the more verbose syntax:

                compile group: 'com.github.spullara.mustache.java', name: 'compiler', version: 0.8.10, transitive: false

These are then put into .gradle in your home directory. They're not that easy to find or reference. You can copy all the references to a directory like so:

                task copyToLib(type: Copy) {
                    from configurations.compile
                    into "libs/"
                }

This would be useful in Android development where Android demands the libs be in there.

You can make eclipse's .classpath reference the libs by first putting this at the top of your build script:

                apply plugin: 'eclipse'

And then by running 'gradle eclipse' on the command line.
