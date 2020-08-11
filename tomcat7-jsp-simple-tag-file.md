Title: JSP: Create a tag file
Tags: java-jsp, java
date: May 6, 2013

Put this in your WEB-INF/tags folder. It's called box.tag:

		<%@ attribute name="colour" required="true" rtexprvalue="true" %>
		<div style="background-color: ${colour}">
			<jsp:doBody />
		</div>

Note the attribute directive. It's saying the tag requires a parameter called 'color' and we can add in run-time expressions if we won't (i.e. not static text only).

You can also pass a 'type' to the attribute tag. This is for when you're passing an object, not a String. It must be the fully qualified class name.

You can pass dynamic attributes, too. This means any attribute you specify on the calling tag will end up in a list of dynamic attributes that you can iterate over in your tag file:

		<%@ tag dynamic-attributes="dynattrs" %>
		...
		<c:forEach var="a" items="${dynattrs}">
			${a.key}="${a.value}"
		</c:forEach>
		...

Now you're specifying, in the 'tag' directive, that all the dynamic attributes will be in a property called ${dynattrs}.

Now reference this from your JSP file:

		<%@ taglib tagdir="/WEB-INF/tags" prefix="mytag" %> 
		<mytag:box colour="#ccc" something="dynamic">
			Hiya
		</mytag:box>

Note the taglib directive has the taglib attribute that points to the directory where our box.tab file is. We give this a prefix.

Then we call a xml like tag, with the name above as the namespace, followed by the name of the tab. We add in the required attribute 'color'. And the content between the tags.

We could also use this more verbose version:

		<%@ taglib tagdir="/WEB-INF/tags" prefix="mytag" %> 
		<mytag:box>
			<jsp:attribute name="color">#ccc</jsp:attribute>
			<jsp:body>hi ho</jsp:body>
		</mytag:box>
