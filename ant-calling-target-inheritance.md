Title:Ant: Calling targets and Inheritance
{{wl-tags:ant|ant-inheritance|ant-target|ant-antcall}}{{wl-publish: 2012-12-07 15:53:03 -0500 | Denevell }}

You can call other targets using antcall:

     <target name="thetarget">
        <antcall target="atarget" />
        <antcall target="anothertarget" />
     </target>

You can also perform inheritance from imported build files: If you have an ant build file, build.xml, that imports another i.e.  

     ...
      <import file="/dir/another_build_file.xml" />
     ...

And another_build.file.xml has a target name 'android_rules' and a target 'debug' like so:

     ...
     <project name="android_rules" default="debug">
       <target name="debug">
         ....
       </target>
       ...
     </project>
     ...

Then in your build.xml file you can inherit 'debug' from the other build file by referencing android_rules.debug:

     <target name="debug" extends="android_rules.debug">
       ...
     <target>

If you use android_rules.debug in antcall tasks too.
