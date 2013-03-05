title: Java velocity
date: 2012-3-15 00:13:34
tags: java,java-velocity

This is a tempting engine. After including the jar, and one comes with all its dependencies, you can first make a data object. 

		public class TestDataClass {
			private String oneValue = "One value";
			private String anotherValue = "Another value";
			
			public String getOneValue() {
				return oneValue;
			}
			
			public void setOneValue(String value) {
				oneValue = value;
			}
		}

Then add it to a VelocityContext. Make a StringWriter. And InputStreamReader from a file in your /res/ directory with the .vm file.

		TestDataClass data = new TestDataClass();
		VelocityContext con = new VelocityContext();
		con.put("data", data);
		StringWriter writer = new StringWriter(); 
		Reader isr = new InputStreamReader(getClass().getResourceAsStream("/res/output.vm"));
		Velocity.evaluate(con, writer, "", isr);
		System.out.println(writer.toString());

The /res/output.vm is 

		#set($hihi = "hihi" )
		Oh my god a value: $data.oneValue Something defined here: $hihi

This is defining a whole new variable, hihi. And loading the oneValue from the data object. See http://velocity.apache.org/engine/devel/developer-guide.html for its full capabilities, which are a lot more than shown here.

The final printLn statement will print the template with the values added.
