title: Java Servlet: Servering static content
tags: java,java-servlet,java-servlet-static-content

If you want to server static content -- like PNGs, Javascript, etc -- you need to explicitly tell your server this in its web.xml

There are a couple of ways to do this, but this is the simpliest and requires the least code. I'm using Jetty 9, but it should work across the board.

First create the web.xml to have the usual xmlns and xsi stuff along with the display-name. Then add some server-mappings going from the 'default' server and applying that to the content you want, PNGs files etc.

    <web-app xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"
        version="2.4">
    
        <display-name>PROJECT_NAME</display-name>
    
       <servlet-mapping>
         <servlet-name>default</servlet-name>
         <url-pattern>*.css</url-pattern>
       </servlet-mapping> 
       <servlet-mapping>
         <servlet-name>default</servlet-name>
         <url-pattern>*.js</url-pattern>
       </servlet-mapping> 
       <servlet-mapping>
         <servlet-name>default</servlet-name>
         <url-pattern>*.png</url-pattern>
       </servlet-mapping> 
       
The rest of the web.xml file is as usual, i.e:
    
        <servlet>
           <servlet-name>YOUR_SERVLET_NAME</servlet-name>
           <servlet-class>your.class</servlet-class>
            <load-on-startup>1</load-on-startup>
        </servlet>
        <servlet-mapping>
           <servlet-name>YOUR_SERVLET_NAME</servlet-name>
           <url-pattern>/*</url-pattern>
        </servlet-mapping>
    
    </web-app>
