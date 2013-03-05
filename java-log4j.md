title: Java: Log4J
date: 2012-3-16 00:13:34
tags: java,java-log4j

First we have a bin/res/log4j.properties

		# Set root category priority to INFO and its only appender to CONSOLE.
		log4j.rootCategory=INFO, CONSOLE

		# CONSOLE is set to be a ConsoleAppender using a PatternLayout.
		log4j.appender.CONSOLE=org.apache.log4j.ConsoleAppender
		log4j.appender.CONSOLE.layout=org.apache.log4j.PatternLayout
		log4j.appender.CONSOLE.layout.ConversionPattern=%-4r %-5p %c{1} %x - %m%n

We're saying in the first uncommented line the default message is an INFO message and it is appended to a console as defined below it.

We're defining the console to be the usual log4j console, then giving it various properties such as the fact we'll be outputting via a pattern as defined in ConversionPattern. The pattern's code is explained here http://www.tutorialspoint.com/log4j/log4j_patternlayout.htm 

Now 			
    
		Reader isr = new InputStreamReader(Main.class.getResourceAsStream("/res/log4j.properties"));
		Properties p = new Properties();
		p.load(isr);
		PropertyConfigurator.configure(p);					
				
		Logger l = Logger.getLogger(Main.class);
		l.info("a message");

First we're loading the properties file, and load it into a Properties object and pass that to the PropertyConfiguration to configure log4j. Then you create a Logger with the name of your current class. Then the info output will output via the configuration parameters set above.
