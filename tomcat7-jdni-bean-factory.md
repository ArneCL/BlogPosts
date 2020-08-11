title: Tomcat: JDNI bean factory from context  
Tags: tomcat|tomcat-jndi|java
Date: 2013-02-10 18:30:21 -0500 
Author: Denevell

You can use a context to grab a simple JavaBean instance. First create the POJO in your src/ directory:

    package org.denevell.tomcat;
     public class MyBean {
       private String foo = "Default Foo";
       public String getFoo() {
        return this.foo;
      }
     public void setFoo(String foo) {
        this.foo = foo;
     }
    }

Then tell your web.xml that you can get this via JNDI:

     <web-app ... >
       ...
       <resource-env-ref>
         <resource-env-ref-name>
           bean/MyBeanFactory
         </resource-env-ref-name>
         <resource-env-ref-type>
           org.denevell.MyBean
         </resource-env-ref-type>
       </resource-env-ref>
       ...
     </webapp>

The resource-env-ref-name gives your factory name that will be used later. The resource-env-ref-type tells it what class to to return.

You also need to define the factory in the Tomcat specific web/META-INF/context.xml:

      <Context>
        <Resource name="bean/MyBeanFactory"
                type="org.denevell.tomcat.MyBean"
                factory="org.apache.naming.factory.BeanFactory"
                foo="From context.xml"/>
      </Context>

It first refers to the name above, and defines its class again, tells Tomcat what factory to use to create this resource and sets an initial parameter, calling getFoo() on the object in this case. This resource is by default a singleton.

You can now get an instance of that Java bean as follows:

      ...
      try {
        Context initCtx = new InitialContext();
        Context envCtx = (Context) initCtx.lookup("java:comp/env");
        MyBean bean = (MyBean) envCtx.lookup("bean/MyBeanFactory");
        bean.setFoo(bean.getFoo()+".");
        writer.println("foo = " + bean.getFoo());
      } catch(NamingException e) {
        writer.println("Naming exception.");
      }
      ...

We first get a InitialContext(), and get the environmental Context from such, 'java:comp/env' being the entry point to your servlet's JNDI environment. Then we use that to refer to the factory using the JNDI name we defined. You can now play with the object to your heart's content.
