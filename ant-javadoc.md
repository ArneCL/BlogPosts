{{wl-tags: ant|ant-javadoc}}{{wl-publish: 2012-11-19 10:14:12 -0500 | Denevell }}

These targets in your build.xml will one generate the javadoc in a directory and two put it in a jar for you.

        <target name="doc">
          <javadoc sourcepath="${src.dir}" destdir="${doc.dir}" />
        </target>
  
        <target name="doc-jar" depends="doc">
          <mkdir dir="${jar.dir}" />
          <jar destfile="${jar.dir}/${jardoc.name}" basedir="${doc.dir}">
            <manifest>
            </manifest>
          </jar>
        </target>
