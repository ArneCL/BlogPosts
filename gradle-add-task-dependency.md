title: Gradle: Add a task dependency
tags: gradle, gradle-task-dependency

If you already have a task -- test for example -- and you want to make that depend on a task you've written you can do the following:

    task myTask() {
      // blar
    }
    
    test.dependsOn myTask

'gradle test' will look like

    ...
    :myTask
    :compileTestJava
    :processTestResources
    :testClasses
    :test
    ...
