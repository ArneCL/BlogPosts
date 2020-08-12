Title: Tomcat 7: Deploying a simple Servlet
Tags: java-tomcat|java-tomcat-setup|java-ant|java-tomcat-httpservlet|java
Date: 2013-02-10 09:42:03 -0500 

Now you've deployed a simple JSP, you can now alter that to deploy a simple servlet.

First change the web.xml file to point to a servlet. Not the new servlet-class tag.

     <web-app xmlns="http://java.sun.com/xml/ns/j2ee" 
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"
       version="2.4">
     
       <display-name>Hello, World Application</display-name>
       <description> A simple servlet </description>
     
       <servlet>
         <servlet-name>HelloServlet</servlet-name>
         <servlet-class>org.denevell.tomcat.Hello</servlet-class> 
       </servlet>
       <servlet-mapping>
       <servlet-name>HelloServlet</servlet-name>
         <url-pattern>/hello</url-pattern>
       </servlet-mapping> 
     
     </web-app>

And now create the Hello.java file in src/org/denevell/tomcat/

     public final class Hello extends HttpServlet {
        @Override
        public void doGet(HttpServletRequest request,
                          HttpServletResponse response)
          throws IOException, ServletException {
            response.setContentType("text/plain");
            PrintWriter writer = response.getWriter();
            writer.println("Sup?");
        }
     }

We're extending a servlet class, and overriding the doGet method that deals with HTTP GET requests. The first parameter is what's sent to the  serlvet and the second is what's going back to the client. In it we simply set the content type, get its writer and write something to it.

We now need to update our build.xml to ensure we're compiling this class. Note we've set a new property to point to your tomcat directory, added the libraries in a classpath, and created a new javac and copy task in the compile target.

     ...
        <property name="catalina.home" value="/usr/share/tomcat7" />
         
        <path id="compile.classpath">
          <fileset dir="${catalina.home}/bin">
            <include name="*.jar"/>
          </fileset>
          <pathelement location="${catalina.home}/lib"/>
          <fileset dir="${catalina.home}/lib">
            <include name="*.jar"/>
          </fileset>
        </path>
     
        <target name="compile" depends="prepare">
          <javac srcdir="${src.home}" includeantruntime="false" destdir="${build.home}/WEB-INF/classes">
            <classpath refid="compile.classpath"/>
          </javac>
          <copy todir="${build.home}/WEB-INF/classes">
            <fileset dir="${src.home}" excludes="**/*.java"/>
          </copy>
        </target>
     ...

Now you can deploy that servlet and see your new servlet at (if you've deployed it to hiya/ again):

     http://localhost:8080/hiya/hello
