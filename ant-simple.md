Tags:  ant|ant-basic|ant-delete|ant-mkdir|ant-property|ant-javac|ant-jar

Date: 2012-11-18 07:02:10 -0500 
Author: Denevell

Here's a fairly bare-bones ant example, the one I'm using for BriefWebServer. 

It makes a jar in build/jar, and optionally run the jar.

    <project name="BriefWebServer" basedir="." default="jar">
        <property name="src.dir" value="src" />
        <property name="build.dir" value="build" />
        <property name="classes.dir" value="${build.dir}/classes" />
        <property name="jar.dir" value="${build.dir}/jar" />
        <property name="jar.name" value="BriefWebServer.jar" />
        <property name="package.name" value="org.denevell.briefwebserver" />
  
        <target name="compile">
            <mkdir dir="${classes.dir}" />
            <javac srcdir="${src.dir}" destdir="${classes.dir}" />
        </target>
    
        <target name="jar" depends="compile">
            <mkdir dir="${jar.dir}" />
            <jar destfile="${jar.dir}/${jar.name}" basedir="${classes.dir}">
              <manifest>
                <attribute name="Main-Class" value="org.denevell.briefwebserver.BriefWebServer" />
              </manifest>
            </jar>
        </target>
  
        <target name="run">
            <java jar="build/jar/BriefWebServer.jar" fork="true" />
        </target>
  
        <target name="clean">
            <delete dir="${build.dir}" />
        </target>
  
    </project>
