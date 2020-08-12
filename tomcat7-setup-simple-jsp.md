Title: Tomcat 7: Deploying a simple JSP
Tags: java-tomcat|java-tomcat-setup|java-ant|java
Date: 2013-02-10 06:52:49 -0500 

First download Tomcat7. I used this to get it setup in Debian (https://wiki.bedis.eu/debian/squeeze_tomcat7_installation until Servlet installation). 

Then create a working directory for your project. Here's the directory structure. Note we're not using the src/ directory just as yet.

     src/
     web/
     web/WEB-INF/

In the web/ directory put a simple JSP file called hello.jsp. Note the notation for including java code.
 
     <%= new String("Hiya.") %>

Now create a web.xml file in your web/WEB-INF/ folder (stands for web information that will tell the servlet container about this site).

     <web-app xmlns="http://java.sun.com/xml/ns/j2ee"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"
       version="2.4">
     
       <display-name>Hello, World Application</display-name>
       <description>
         Sup?
       </description>
     
       <servlet>
         <servlet-name>HelloServlet</servlet-name>
       </servlet>
       <servlet-mapping>
         <servlet-name>HelloServlet</servlet-name>
         <url-pattern>/hello</url-pattern>
       </servlet-mapping>
     
     </web-app>

After all the schema definitions and the version information in web-app, the display-name tell your servlet container (Tomcat) the site's name for administration purposes, and description likewise.

Then the servlet tag has a servlet-name for you to define your serlvet a name that will be used later in mapping. You'd normally define a Java class under servlet-class also, but we're not creating Java classes in this tutorial.

Finally you set a servlet-mapping, that points via servlet-name to the name of the servlet you defined above, and maps that to a url via url-pattern, '/hello' in this case.

Next you will need a build.xml file to build this via Ant.

     <project name="My Project" default="compile" basedir=".">
     
      <property name="build.home" value="${basedir}/build"/>
      <property name="src.home" value="${basedir}/src"/>
      <property name="web.home" value="${basedir}/web"/>
     
      <target name="compile" depends="prepare">
      </target>
     
      <target name="prepare">
        <mkdir dir="${build.home}"/>
        <mkdir dir="${build.home}/WEB-INF"/>
        <mkdir dir="${build.home}/WEB-INF/classes"/>
        <copy todir="${build.home}">
          <fileset dir="${web.home}"/>
        </copy>
      </target>
     
     </project>

We first set the properties for the project. Then we have a blank compile target, that would normally compile your Java classes. And this depends on a prepare target that copies all the stuff in web/, i.e. web.xml and hello.jsp, into the build directory. Run 'ant' to make it do this.

Then you need to deploy this. You'd normally package this up into a WAR (Web ARchive) file, but Tomcat allows you merely to copy the content of build/ into its webapps/ folder (in the location where tomcat is installed, in my case /var/lib/tomcat). You do this via:

     mkdir $YOUR_TOMCAT_HOME/webapps/hello
     cp -r build/ $YOUR_TOMCAT_HOME/webapps/hello

Then restart your tomcat installation for good measure. You new web site is available at:

     http://localhost:8080/hello/hello.jsp
