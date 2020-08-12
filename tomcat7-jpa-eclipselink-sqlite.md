Title: Tomcat 7: JPA using EclipseLink and Sqlite
Tags: java|java-jpa-jpql|java-jpa|java-tomcat|sql-sqlite|sql
Date: 2013-02-16 12:33:25 -0500 

Download EclipseLink, the reference implementation for JPA, from http://www.eclipse.org/eclipselink/downloads/ and the sqlite jdbc library, from https://bitbucket.org/xerial/sqlite-jdbc/downloads. 

Copy, eclipselink.jar, javax_persistence_2.x.x.jar and the sqlite jdbc jar file into your tomcat lib directory, /usr/share/tomcat7/lib in my case.

Now restart tomcat.

Create persistence.xml in src/META-INF/persistence.xml.

      <?xml version="1.0" encoding="UTF-8" ?>
      <persistence xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd"
          version="2.0"
          xmlns="http://java.sun.com/xml/ns/persistence">
        <persistence-unit name="example" transaction-type="RESOURCE_LOCAL">
          <provider>org.eclipse.persistence.jpa.PersistenceProvider</provider>
          <class>org.denevell.tomcat.entities.write.AnotherThing</class>
          <properties>
            <property name="javax.persistence.jdbc.driver" value="org.sqlite.JDBC" />
            <property name="javax.persistence.jdbc.url" value="jdbc:sqlite:/var/lib/tomcat7/dbs/test.db" />
            <property name="eclipselink.logging.level" value="ALL" />
            <property name="eclipselink.ddl-generation" value="create-tables" />
          </properties>
        </persistence-unit>
     </persistence>

The persistence-unit name will be how we will grab a hold of our persistence entity manager factory. The transaction-type say we're using a local database. If it said JTA it would mean we'd have support for transactions over multiple datasources (Tomcat doesn't support this out of the box). 

We next tell it about the provider, EclipseLink, in our case. Then the class that will be persisted. Then we set properties to tell it about our driver, our jdbc url, the logging level and how we will generate the database.

We could set eclipselink.ddl-generation to 'drop-and-create-tables' if we want to destroy the database everytime. In a later tutorial we'll detail how to work with an existing database without automatically doing anything, since the eclipselink.ddl-generation is only really useful during development.

Here's what our 'AnotherThing' entity looks like:

    package org.denevell.tomcat.entities.write; // Referenced in persistence.xml
    
    @Entity
    public class AnotherThing {
      @Id @GeneratedValue
      private int id;
      private String text;
      public AnotherThing() {
      }
      public int getId() {
          return id;
      }
      public void setId(int id) {
          this.id = id;
      }
      public String getText() {
          return text;
      }
      public void setText(String text) {
          this.text = text;
      }
    }

Note @Entity defines our class as just that, the @Id annotation says this is the primary key of the entity, and @GeneratedValue say the persistence provider generates its value.

We can now talk to our JPA instance:

    // Setup the entity manager
    EntityManagerFactory factory =   Persistence.createEntityManagerFactory("example");
    EntityManager em = factory.createEntityManager();
    // Create it
    AnotherThing t = new AnotherThing();
    t.setText("Heya");    	
    // Add it
    EntityTransaction trans = em.getTransaction();
    trans.begin();
    em.persist(t);
    trans.commit();
    // Fetch them
    TypedQuery<AnotherThing> q = em.createQuery("select ting from AnotherThing ting", AnotherThing.class);
    List<AnotherThing> results = q.getResultList();
    for (AnotherThing thing : results) {
      writer.println(thing.getId() + ": " + thing.getText());
    }
    // Close the entity manager
    em.close();
    factory.close();

Note we're using our name of the persistence-unit above to get the entity manager factory. Then we get the entity manager (we should only have one of these). Then we create a new object as normal. 

We then start an entity transaction (we could use this to rollback if we wanted). Then we persist the object, committing the transaction. 

Finally we use the JPQL syntax to get all the 'AnotherThing' objects in the database. Then we close the entity manager, and the entity manager factory.

I did get some error about AnotherThing not being recognised. Unfortunatley I think this is a bug in Tomcat for the most part. Stopping and then starting Tomcat should resolve the problem.
