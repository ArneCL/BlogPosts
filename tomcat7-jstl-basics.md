Title: JSP: Setup JSTL and EL in Tomcat 7
Tags: java-jsp,java-jstl,tomcat
date: May 4, 2013

If you want to use JSTL (and you do) instead of scriptlets you first have to include it in your war file or your tomcat lib file.

I imported it into my project using Gradle. You should see the jar file in the created WAR file once you're using it.

Now you can use things like:

	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
	<c:forEach var="p" items="${applicationScope['products'].values().iterator()}">

		${p.name} | ${p.getPrice()} || <a href="Cart?add=true&id=${p.getId()}">add</a>
		<br />

	</c:forEach>

Note you don't need the scriptlet %@ page import.. directives anymore. You do need thee taglib directive to point to the jstl core library.

Note we're using the JSP EL, expression language, syntax to call method and attribute (p.name is the same as p.getName()). EL comes with Tomcat 7 - no additional libraries are required.

As with scriplets there are implicit objects in EL, applicationScope, in this example. 'applicationScope['products'] is the same as applicationScope.getAttribute('products').
