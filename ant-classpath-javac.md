title: Ant classpath and javac
date: 2012-4-7 23:13:30
tags: java-ant|java

You can add to the classpath giving pathelement tags to a path element. The path's id will be used later on to reference this.

	<path id="class.path">
		<pathelement location="lib/somjar.jar" />
		<pathelement location="${build.dir}" />		
	</path>

(We're including the classes in our build directory here, as when we run junit test we'll need to find out where they are.)

Here's the javac tag which takes a source and destination attributes. You can put a classpath tag in within, to reference the previous one we made.

	<target name="compile" depends="clean, mkdirs">
		<javac srcdir="${src.dir}" destdir="${build.dir}">
			<classpath refid="class.path" />
		</javac>
	</target>
