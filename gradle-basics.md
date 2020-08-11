Title: Gradle basics
Tags: gradle, gradle-basics
date: Mar 22, 2013

You run grade tasks on the command line with

    gradle -q taskName

If you remove -q it will output lots of verbose information.

Create a build.gradle file. A task is create like

    task yourTask {
      doLast {
        print "Hey."
      }
    }

Or more succinctly:

    task yourTask << {
      // Steps
    }

You can specify your dependencies with:

    task yourTask(dependsOn: someTaskAbove) << {
      // Steps
    }

If you haven't already specified the task, you can use it in quotes instead: 'someTaskAbove'.

You can issue normal Groovy code in the tasks or outside:

    4.times { println "$it" }

Where "$it" is the iterator. You can also specify the iterator explicitly in Groovy:

    4.times { counter -> println "$counter" }

You can even dynamically create tasks from code outside, or inside, any task block:

    4.times { counter ->
                task "task$counter" << {
                        println "Dynamic task, innit: $counter."
                }
    }

And you can define methods:

    void someMethod() {
      // Code
    }

You can access methods on tasks using their API:

    task3.doFirst {
      // Some more code
    }

You can add properties to tasks using the ext property in the task:

    task3.doFirst {
      ext.aproperty = "Property, yo."
    }
  
Then once you're in task3 you can reference ext.aproperty.

You can set properties before tasks are run based on what tasks are specified on the command line:

    gradle.taskGraph.whenReady {taskGraph ->
        if (taskGraph.hasTask(release)) {
            version = '1.0'
        } else {
            version = '1.0-SNAPSHOT'
        }
    }

Providing you have a 'release' task, and you call it on the command line, the build script will have '1.0' as its version property, otherwise it will have '1.0-SNAPSHOT'.

You can specify default tasks to run with:

    defaultTasks 'atask', 'anothertask'
