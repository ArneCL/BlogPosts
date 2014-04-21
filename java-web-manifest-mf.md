title: Java: Accessing MANIFEST.MF fields in web projects
tags: java,java-manifest

Let's say you have a MANIFEST.MF file of the form

    Manifest-Version: 1.0
    SomeVar: SomeValue
    
In a directory such as src/main/resources/META-INF, in the case of War projects files in Gradle, then when your WAR file is compiled it'll be in WEB-INF/classes/META-INF/.

When your application starts you can start a listener that parses this file, e.g. in your web.xml file define a listener that starts a class, which should be the first listener incase any subsequent listeners want to use the parsed variables:

    <web-app>
            ...
            <listener>
                    <listener-class>com.example.ManifestVars</listener-class>
            </listener>
            ...
     </web-app>

In the ManifestVars class, which must implement ServletContextListener since it's a listener, you can then parse the MANIFEST.MF file, giving the rest of your app static access to the fields therein.

    package com.example;
    
    import java.io.InputStream;
    import java.util.jar.Attributes;
    import java.util.jar.Manifest;
    
    import javax.servlet.ServletContextEvent;
    import javax.servlet.ServletContextListener;
    
    /** 
     * Reads the war's manifest from /META-INF/MANIFEST.MF on application startup.
     * 
     * Must be included as the first <listener></listener> in the web.xml file.
     */
    public class ManifestVars implements ServletContextListener {
    
    	private static Attributes sMainManifestAttributes;
    	
    	/**
    	 * Read the manifest from /META-INF/MANIFEST.MF
    	 */
    	@Override
    	public void contextInitialized(ServletContextEvent sce) {
    		try {
    			InputStream inputStream = getClass().getClassLoader().getResourceAsStream("META-INF/MANIFEST.MF");
    			Manifest manifest = new Manifest(inputStream);
    			sMainManifestAttributes = manifest.getMainAttributes();
    		} catch (Exception e) {
    			throw new RuntimeException(e);
    		}	
    	}
    
    	@Override
    	public void contextDestroyed(ServletContextEvent sce) {
    		sMainManifestAttributes = null;
    	}
    
    	/**
    	 * Generic querying of the manifest.
    	 * @return The result, as run through String.trim()
    	 */
    	public static String getValue(String name) {
    		return sMainManifestAttributes.getValue(name).trim();
    	}
    
    }


In this class we get an InputStream of META-INF/MANIFEST.MF, and since our WAR file classes's directory is at WEB-INF/classes, then in this context, we're accessing WEB-INF/classes/META-INF/MANIFEST.MF.

It's probably a good idea, in this class, to define new static variables for parts of your MANIFEST.MF file, for example a getter and setter for 'SomeVar' in the MANIFEST.MF file.

Now in rest of your application, you can simple call somthing like ManifestVars.getSomeVar(), should you have defined that variable
