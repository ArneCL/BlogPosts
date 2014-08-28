Title: Eclipse plugin: Accessing files bundles with the plugin
tags: eclipse,eclipse-plugin

If you've got a plugin, you often want to access text files, or whatever, bundled with that plugin.

This provides the answer: http://blog.vogella.com/2010/07/06/reading-resources-from-plugin/

1. Make a /files/ directory in your plugin's base directory.

2. Use this method

        public static String getFileFromBundle(String fileName) {
        	try {
        		URL url = new URL( "platform:/plugin/ITS_SYMBLOIC_NAME/files/"+fileName);
        		InputStream inputStream = url.openConnection().getInputStream();
        		BufferedReader in = new BufferedReader(new InputStreamReader(inputStream));
        		String inputLine, total="";
        		while ((inputLine = in.readLine()) != null) {
        			total = total + inputLine + "\n";
        		}
        		in.close();
        		return total;
        	} catch (IOException e) {
        		e.printStackTrace();
        		return null;
        	}
        }

The SYMBOLIC-NAME above refers to the values in the META-INF/MANIFEST.MF file:

        ...
        Bundle-SymbolicName: ITS_SYMBLOIC_NAME;singleton:=true
        ...
