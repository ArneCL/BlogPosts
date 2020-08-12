title: JSF2: Resource bundles / localisation
tags: java-jsf,java-jsf-resource-bundle,java
date: 2013-03-28 20:19:00

In your WEB-INF folder place a faces-config.xml file:

		<?xml version='1.0' encoding='UTF-8'?>
		<faces-config version="2.0"
			      xmlns="http://java.sun.com/xml/ns/javaee" 
			      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
			      xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-facesconfig_2_0.xsd">
		    <application>
			<resource-bundle>
			    <base-name>things</base-name>
			    <var>bundle</var>
			</resource-bundle>
			<locale-config>
			    <default-locale>en</default-locale>
			    <supported-locale>fr</supported-locale>
			</locale-config>
		    </application>

		</faces-config>

You're saying your resource bundle is called things.properities in the root your your classes directory, and you can access it in your JSF page via 'bundle'. We're saying we support both english and french.

Now create that things.properties file. I'm putting it in my resources/ folder. You need to make sure this ends up in the root of your classes directory.

		hello=Hiya

In your jsf page you can access it via:

		#{bundle.hello}

If you have a things_fr.properties file, and your browser is set to French, it will use the french version for the resources bundle.
