title: Maven p7: Plugins p2
date: 2012-02-25 16:45:09
tags: maven,maven-plugins

You can also pass parameters to your java class.

		/**
		 * @parameter expression="${our.message}" default-value="default message, innit"
		 */
		private Object message;
		
		public void execute() 
		throws MojoExecutionException, MojoFailureException {
			getLog().info(message.toString());
		}

Note that the @parameter is injecting a value, of our.message, into the 'message' variable, giving it a default message if that doesn't exist.

The last part of the parameter, message in this case, must match the java object name.

If you add -Dour.message="something else" on the previous command we ran to execute the plugin, we'll output 'something else' instead of the default.

You can also add it in your pom.xml when you include this plugin into another project. More on that next.
