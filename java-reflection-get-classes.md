title: Java: Get all classes in a package via reflection
tag: java,java-reflection

If you use the excellent Reflections java library, you can do this easily enough:

		Reflections reflections = new Reflections("Your.package.name");
		Set<Class<? extends Action>> classes = reflections.getSubTypesOf(YourClass.class);
		for (Class<? extends Action> class : classes) {
			try {
				YourClass your = class.newInstance();
			} catch (Exception e) {
				e.printStackTrace();
			} 
		}

Here you specify the package and the classtype that the classes must either extend or implement. 

You throw an exception if you try to make a new instance of a class that's freaky for some reason - no null arg constructor for example.
