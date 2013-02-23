{{wl-tags: ant|ivy|ivy-fetching}}
{{wl-publish: 2012-11-18 12:44:11 -0500 | Denevell }}

If your repository isn't local or isn't on the default maven reposistory on the internet, you'll need to specify it in ivysettings.xml. Apache Ivy calls these 'resolvers':

    <ivysettings>
      <settings defaultResolver="chain"/>
      <resolvers>
        <chain name="chain">
          <ibiblio name="central" m2compatible="true"/>
           <url name="denevell">
              <ivy      pattern="http://ivy.denevell.org/[organisation]/[module]/[revision]/ivy-[revision].xml" />
              <artifact pattern="http://ivy.denevell.org/[organisation]/[module]/[revision]/[artifact]-[revision].[ext]" />
            </url>
        </chain>
      </resolvers>
    </ivysettings>
Note we've kept the 'central' ibiblio resolver. This is the one at mvnrespository.com.

The pattern matches how we published using ssh.

Then in ivy.xml you'll say what you want to grab from that repository:
 
    <ivy-module version="2.0">
      <info organisation="denevell" module="bws"/>
      <dependencies>
        <dependency org="denevell" name="BriefWebServer" rev="0.1"/>
      </dependencies>
    </ivy-module>

So we're looking at http://ivy.denevell.org/denevell/BriefWebServer/0.1/ivy-0.1.xml next to find the files to get back down. That file was generated when ivy published the module.

Then you can run ant to do the retrieving.

    <project xmlns:ivy="antlib:org.apache.ivy.ant" name="SampleApp" default="resolve">
     <target name="resolve">
         <ivy:retrieve type="jar" pattern="libs/[artifact]-[revision].[ext]"/>
         <ivy:retrieve type="source" pattern="libs-non-dex/[artifact]-[revision]-[type].[ext]"/>
     </target>
    </project>

These two retrieve lines get different tpyes, jar and source, and put them into different directories, libs and libs-non-dex, specifying their filename pattern.

The files will be in lib/ by default.
