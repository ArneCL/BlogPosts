title: JSF2: Composites 
tags: java,jsf,jsf-composites
date: 2013-03-28 20:19:00

You can also have a composite in a JSF, which is like a template but acts in its own namespace, with validators, listeners, etc, etc.

First create a resources/mycomp/comp.xhtml file in your web directory.. It has to be in this resources directory for JSF can find it as a composite.

		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
		  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<div xmlns="http://www.w3.org/1999/xhtml"
		  xmlns:composite="http://java.sun.com/jsf/composite"
		  xmlns:h="http://java.sun.com/jsf/html">
			<composite:interface>
			    <composite:attribute name="thevalue" required="true"/>
			</composite:interface>

			<composite:implementation>
			    <h:outputLabel value="#{cc.attrs.thevalue}"></h:outputLabel>
			</composite:implementation>
		</div>

You see the composite namespace, and interface tag that defines the parameters passed to this, and the implementation tag that uses such in as cc.attrs.thevalue. (cc standards for composite and attrs the... attributes).

Now in your calling file, add the namespace. Note the mycomp directory relating to your directory after web/resources.

	xmlns:thecomp="http://java.sun.com/jsf/composite/mycomp/">      

Now in your calling file you can call. 

    <thecomp:comp value="HITHERE" />

The 'comp' part comes from the filename we gave above.
