Title: Gradle: Speeding up tasks with the daemon
Tags: gradle,gradle-daemon

Gradle is rather slow to get going. You can use the daemon to fix that.

Just put 

		export GRADLE_OPTS="-Dorg.gradle.daemon=true"

in your shell startup script and gradle will hang around in the background waiting for new tasks.

It sped up my task -- which automatically undeployed and then deployed a WAR file to tomcat -- from 8 seconds to 2-3 seconds.
