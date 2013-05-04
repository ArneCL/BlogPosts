Title: JSP: Create a tag file
Tags: jsp,jsp-tag-files

Put this in your WEB-INF/tags folder. It's called box.tag:

		<%@ attribute name="colour" required="true" rtexprvalue="true" %>
		<div style="background-color: ${colour}">
			<jsp:doBody />
		</div>

Note the attribute directive. It's saying the tag requires a parameter called 'color' and we can add in run-time expressions if we won't (i.e. not static text only).

Now reference this from your JSP file:

		<%@ taglib tagdir="/WEB-INF/tags" prefix="mytag" %> 
		<mytag:box colour="#ccc">
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
