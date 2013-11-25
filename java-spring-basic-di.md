title: Basic Dependency Injection with Spring (with Gradle)
tags: java,spring,gradle

Let's start with some simple setter injection with an XML-based configuration.

First you need an WEB-INF/beans.xml, or whatever you want to call it, file. This will define the beans you will inject.

    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context"
        xsi:schemaLocation="http://www.springframework.org/schema/beans 
        http://www.springframework.org/schema/beans/spring-beans-3.1.xsd 
        http://www.springframework.org/schema/context 
        http://www.springframework.org/schema/context/spring-context-3.1.xsd"> 
    
            <bean id="otherthing" class="OtherThing">
            </bean>
      
            <bean id="thing" class="Thing">
                <property name="other">
                    <ref bean="otherthing" />
                </property>
            </bean>
      
    </beans> 

This defines two bean, OtherThing.java and Thing.java. (We're putting these, along with Main.java in src/main/java for our Gradle project)

The 'thing' bean says that Thing.java has a setter property called 'other' and we'll inject the OtherThing.java bean there.

Here are the two classes references above.

    public class OtherThing {
        
    	public String output() {
    		return "Yes, it's a real thing";
    	}
    }

Notice the setter on the following classes, as referenced in the beans.xml file.

    public class Thing {
        
        private OtherThing other;
        
        public void setOther(OtherThing other) {
            this.other = other;
        }
    
    	public String output() {
    		return other.output();
    	}
    }
    
    
Now our main class, a standard Main.java file, we need to create a factory to pull all these beans, and load the defintions into that factory, and finally use the factory to pull up the beans.

We can either use a DefaultListableBeanFactory with a XmlBEanDefinitionReader:

    DefaultListableBeanFactory factory = new DefaultListableBeanFactory();
    XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(factory);
    reader.loadBeanDefinitions(new FileSystemResource("src/main/resources/META-INF/beans.xml"));

Or we can use an ApplicationContext, which gives us more Spring goodies we can use later on:
	    
    GenericXmlApplicationContext factory = new GenericXmlApplicationContext();
    factory.load("classpath:META-INF/beans.xml");
    factory.refresh();

Either way, we can now use the factory to grab the 'thing' bean be defined earlier. We could reference it by name, but we're choosing to reference it by type.

    Thing test = (Thing) factory.getBean(Thing.class);
    String output = test.output();
    System.out.println(output);
	factory.close();

The full text of this would be:

    public class Main {
    	public static void main(String[] args) {
    	    GenericXmlApplicationContext factory = new GenericXmlApplicationContext();
    	    factory.load("classpath:META-INF/beans.xml");
    	    factory.refresh();
    
    		Thing test = (Thing) factory.getBean(Thing.class);
            String output = test.output();
    		System.out.println(output);
    		
    		factory.close();
    	}
    }


You can use Gradle -- I'm using 1.8 -- to run this:

    apply plugin: 'java'
    apply plugin: 'application'
    apply plugin: 'eclipse'
    
    repositories {
    	mavenCentral()
    }
    
    dependencies {
    	compile 'org.springframework:spring-core:3.2.5.RELEASE'
    	compile 'org.springframework:spring-beans:3.2.5.RELEASE'
    	compile 'org.springframework:spring-context:3.2.5.RELEASE'
    }
    	
    mainClassName = "Main"
        
Then 'gradle run' will produce:

    :compileJava UP-TO-DATE
    :processResources
    :classes
    :jar
    :assemble
    :compileTestJava UP-TO-DATE
    :processTestResources UP-TO-DATE
    :testClasses UP-TO-DATE
    :test
    :check
    :build
    :run
    25-Nov-2013 01:42:29 org.springframework.beans.factory.xml.XmlBeanDefinitionReader loadBeanDefinitions
    INFO: Loading XML bean definitions from class path resource [META-INF/beans.xml]
    25-Nov-2013 01:42:29 org.springframework.context.support.AbstractApplicationContext prepareRefresh
    INFO: Refreshing org.springframework.context.support.GenericXmlApplicationContext@6443226: startup date [Mon Nov 25 01:42:29 GMT 2013]; root of context hierarchy
    25-Nov-2013 01:42:30 org.springframework.beans.factory.support.DefaultListableBeanFactory preInstantiateSingletons
    INFO: Pre-instantiating singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@681e2ca7: defining beans [otherthing,thing]; root of factory hierarchy
    
    Yes, it's a real thing
    
    25-Nov-2013 01:42:30 org.springframework.context.support.AbstractApplicationContext doClose
    INFO: Closing org.springframework.context.support.GenericXmlApplicationContext@6443226: startup date [Mon Nov 25 01:42:29 GMT 2013]; root of context hierarchy
    25-Nov-2013 01:42:30 org.springframework.beans.factory.support.DefaultSingletonBeanRegistry destroySingletons
    INFO: Destroying singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@681e2ca7: defining beans [otherthing,thing]; root of factory hierarchy
    
    BUILD SUCCESSFUL
    
    Total time: 8.872 secs
    
    
If you want to make this into an Eclipse project run 'gradle eclipse'.
