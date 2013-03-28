title: JSF2: Templates
tags: java,tomcat,jsf,jsf-templates

You can have templates in your JSF pages. First create a template as such. Note the ui namespace and the ui:insert placeholders:

		<div xmlns:ui="http://java.sun.com/jsf/facelets">
			<ui:debug/>
			From template <br />
			<ui:insert name="left">Will be replaced</ui:insert> | <ui:insert name="right">Will be replaced</ui:insert>
		</div>

We've also put a ui:debug in this template. In the resulting file, we can press ctl shift d for popup debugging information.

Now again in another file, we can use this template within the ui namespace, decorate in this case. You can also use composition, but that will delete anything not involved in the template from the page. We use ui:define to declare the data for the ui:insert tags above.

		<ui:decorate template ="templ.xhtml">
			<ui:define name="left">
				The left
			</ui:define>
			<ui:define name="right">
				The right
			</ui:define>
		</ui:decorate>

More info is here http://docs.oracle.com/cd/E17802_01/j2ee/javaee/javaserverfaces/2.0/docs/pdldocs/facelets/index.html
