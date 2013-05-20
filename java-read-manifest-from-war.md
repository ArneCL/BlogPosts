Tags: java,java-io,java-manifest
Title: Java: Read MANIFEST.MF values from a WAR file

You access your MANIFEST.MF files in a WAR using the ServletContext to grab an input stream:

		InputStream inputStream = servletContext.getResourceAsStream("/META-INF/MANIFEST.MF");
		Manifest manifest = new Manifest(inputStream);    
		Attributes attr = manifest.getMainAttributes();

Attributes will now have all the values in your MANIFEST.MF file. Even ones you've added yourself.

Note, anything that messes around with your WAR or MANIFEST.MF file, like running this from Eclipse, may cause this not to work.
