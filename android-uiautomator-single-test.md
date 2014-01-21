title: Android UiAutomator: Running a single test
tags: android,android-uiautomator

To run ui automator tests, you need to use the shell in ADB.

    adb shell uiautomator runtest your_tests.jar -e class your_full_class_name_inc_package
    
You can launch the device's shell then run 'uiautomator runtest your_tests.jar -e class your_full_class_name_inc_pacakge' but if you do that you don't keep the history of your command in bash, zsh or whatever shell you use.

To run a single test, append #YourClassName to the previous command.

This all assumes you've added the tests jar to your device by running the 'install' command in the uibuild.xml ant file that comes with UI automator.
