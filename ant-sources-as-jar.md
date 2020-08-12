Tags: java-ant|java
Date: 2012-11-19 10:49:01 -0500 

To create a jar of your sources, the kind of this Eclipse likes to attach to jars so you can see what's happening when you're debugging, add this target:

     <target name="src-jar">
        <mkdir dir="${jar.dir}" />
        <jar destfile="${jar.dir}/${sourcesjar.name}" basedir="${src.dir}">
          <manifest>
          </manifest>
        </jar>
      </target>
