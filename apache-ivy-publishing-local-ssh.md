{{wl-tags: ant|ivy|ivy-publishing}}
{{wl-publish: 2012-11-17 06:00:51 -0500 | Denevell }}
Apache Ivy can publish a set a files to a machine somewhere and then someone else can fetch them down with a command in an Apache Ant build script.

For example, Developer A publishes a jar and javadoc of Project Z at version 1.0. Developer B pull that down to use. Meanwhile, Developer A adds new features to Project Z as version 1.1. Developer B can take down those changes whenever ready.

Create a ivy.xml pointing at the files you want in the repo, say HELLO.txt.

  <ivy-module version="2.0">
    <info organisation="denevell" module="ivytest"/>
    <publications>
      <artifact name="HELLO" ext="txt" type="doc"/>
    </publications>
  </ivy-module>

The module name above is what you'll call to grab these files down.

Then create the build.xml file that publishes it to the local repository.

  <project name="ivytest" default="publish" xmlns:ivy="antlib:org.apache.ivy.ant">
    <target name="publish" description="Publishing">
        <ivy:resolve/>
        <ivy:publish pubrevision="1.1" status="release" resolver="local"  overwrite="true" update="true">
            <artifacts pattern="[artifact].[ext]"/>
        </ivy:publish>
    </target>
  </project>

Now running ant will publish this to ~.ivy2/.

Or you can create an ivysettings.xml to specify that this should go in a ssh site. Change 'resolver' in your build.xml to the 'name' attribute in ssh.

  <ivysettings> 
    <resolvers>
      <ssh name="ssh" publishPermission="0644"
        <artifact pattern="ssh://remoteusername@example.org:1234/your/remote/path/[organisation]/[module]/[revision]/[artifact]-[revision].[ext]" />
        <ivy      pattern="ssh://remoteusername@example.org:1234/your/remote/oath/[organisation]/[module]/[revision]/ivy-[revision].[ext]" />
        </ssh>
      </resolvers>
  </ivysettings>

The [module]/[revision]/[artifact]-[revision].[ext] pattern is where we're storing the files on the server.

The publishPermissions is to give everyone on the net read access.
