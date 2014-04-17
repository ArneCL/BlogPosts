title: PART 3: Using JPA and Postgresql in your application
Tags: java,JPA,postgresql,java-web-quick-start

(This is part of a series http://blog.denevell.org/category_java-web-quick-start.html)

Previously, in our build.gradle file we included these jars to allow us to talk to a Postgresql database through JPA.

    compile 'postgresql:postgresql:9.1-901-1.jdbc4'
    compile 'org.eclipse.persistence:eclipselink:2.4.0'
    
We needed the eclipse link repository for that.

    repositories {
        maven {
            url 'http://download.eclipse.org/rt/eclipselink/maven.repo'
        }
        ...
    }

Now we need to create a Postgresql database user and database to talk to. We'd normally set this up in the environment somehow before running the project.

    (as root)
    su - postgres
    psql -c "create user test_username password 'test_password';"
    psql -c "create database test_database owner test_username"
    (logout from postgres and root)
    
Now we can create the persistence.xml file that tells JPA how to connect to our database.

    echo '
    <?xml version="1.0" encoding="UTF-8" ?>
    <persistence xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd"
      version="2.0" xmlns="http://java.sun.com/xml/ns/persistence">
      <persistence-unit name="PERSISTENCE_UNIT_NAME" transaction-type="RESOURCE_LOCAL">
        <mapping-file>META-INF/mapping.xml</mapping-file>
        <provider>org.eclipse.persistence.jpa.PersistenceProvider</provider>
          <properties>
          <property name="javax.persistence.jdbc.url" value="jdbc:postgresql://localhost:5432/test_database" />
          <property name="javax.persistence.jdbc.driver" value="org.postgresql.Driver" />
          <property name="javax.persistence.jdbc.user" value="test_username" />
          <property name="javax.persistence.jdbc.password" value="test_password" />
          <property name="eclipselink.logging.level" value="ALL" />
    	   </properties>
    	 </persistence-unit>
    </persistence>
    ' > src/main/resources/META-INF/persistence.xml
    
This is doing a couple of things

* Naming the persistence-unit which we'll use when we come to initialise JPA
* Makeing our database transactions will be local to this machine
* Saying there's a mapping file in META-INF/mapping.xml that maps our Objects to the database
* Saying we're using EclipseList for the persistence provider
* Pointing JPA to our database
* Providing the username and password to that database
* Making EclipseLink log everything

Next we'll create a simple Object, or Entity, which we'll persist in the database. It's just a POJO.

    echo '
    package com.example.YOURPROJECT;
    
    public class ExampleEntity {
    	
    	private long id; 
    	private String talky;
    
    	public String getTalky() {
    		return talky;
    	}
    	public void setTalky(String talky) {
    		this.talky = talky;
    	}
    	public long getId() {
    		return id;
    	}
    	public void setId(long id) {
    		this.id = id;
    	}
    
    }
    ' > src/main/java/com/example/YOURPROJECT/ExampleEntity.java
    
We could use annotations on the object to map it to the database, and leave JPA to sort out the tables etc, but that always leads to pain.

So we're creating the mapping.xml file we referred to earlier. 

    echo '
    <?xml version="1.0" encoding="UTF-8" ?>
    <entity-mappings xmlns="http://java.sun.com/xml/ns/persistence/orm"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://java.sun.com/xml/ns/persistence/orm    
      http://java.sun.com/xml/ns/persistence/orm_2_0.xsd"
      version="2.0">
        <entity class="com.example.YOURPROJECT.ExampleEntity"> 
          <table name="example" />
          <named-query name="list">
            <query>select p from ExampleEntity p</query>
          </named-query>       
          <attributes>
            <id name="id">
              <generated-value strategy="auto" />
            </id>
            <basic name="talky">
              <column name="talky" nullable="false"/>
            </basic>
          </attributes>
        </entity>    
    </entity-mappings>
    ' > src/main/resources/META-INF/mapping.xml
    
This is saying:

* Specifying the entity you created above
* Specifying the database table where this entity lives
* Creating a named query called 'list' that lists all the entities
* Defining an primary key id attribute, relating to 'id' in entity, that is an automatically generated value in the database, using the AUTO strategy (see http://www.objectdb.com/java/jpa/entity/generated)
* Defining an talky attribute, relating to 'talky' in the entity, which is the 'talky' column in the database which cannot be null.

We'd normally use a database migration to ensure the table 'example' above exists, but in our case here, let's just create it in the database directly. We're also creating a sequence table so JPA can create unique primary keys.

    psql -h localhost -U test_username -d test_database -c "create table example (id bigserial not null primary key, talky varchar(1000) not null);"
    psql -h localhost -U test_username -d test_database -c "create table sequence (seq_name varchar(50) not null primary key, seq_count int);insert into sequence (seq_name, seq_count) values('SEQ_GEN', 1);"    
    
Now let's create a new request that create a JPA connections, add something to our database and lists everything in it to return.

The comments should example the basics of JPA and EntityManagers.

    echo '
    package com.example.YOURPROJECT;
    
    import java.util.ArrayList;
    import java.util.List;
    import javax.persistence.EntityManager;
    import javax.persistence.EntityTransaction;
    import javax.persistence.Persistence;
    import javax.persistence.TypedQuery;
    import javax.ws.rs.GET;
    import javax.ws.rs.Path;
    import javax.ws.rs.PathParam;
    import javax.ws.rs.Produces;
    import javax.ws.rs.core.MediaType;
    import org.apache.log4j.Logger;
    
    @Path("example_jpa")
    public class ExampleJPARequest {
    
    	@Path("{example}")
    	@GET
    	@Produces(MediaType.APPLICATION_JSON)
    	public List<ExampleResource> example(@PathParam("example") String example) {
    		// Get the EntityManager by creating an EntityManagerFactory via the persistence-unit name we provided.
    		EntityManager entityManager = Persistence.createEntityManagerFactory("PERSISTENCE_UNIT_NAME").createEntityManager();   		
    		// Start a transaction - not needed in this case, but useful to see.
    		EntityTransaction transaction = entityManager.getTransaction();
    		List<ExampleEntity> list  = null;
    		try {
    			transaction.begin();
    			// Add an entity
    			ExampleEntity entity = new ExampleEntity();
    			entity.setTalky(example);			
    			entityManager.persist(entity);
    			// List entities, via the named query we defined in mapping.xml
    			TypedQuery<ExampleEntity> nq = entityManager.createNamedQuery("list", ExampleEntity.class);
    			list = nq.getResultList();
    			// Commit the transaction
    			transaction.commit();
    		} catch (Exception e) {
    			Logger.getLogger(getClass()).error("Problem persisting", e);
    			transaction.rollback();
    			throw e; // Ergo showing a 500 error. You may want to throw an exception that's not detailing stuff about your JPA connection
    		} finally {
    			entityManager.clear(); // Clears all the entities from the EntityManager
    			entityManager.close();
    		}
    		
    		// Adapt the entities into objects to return as JSON
    		ArrayList<ExampleResource> resList = new ArrayList<ExampleResource>();
    		for (ExampleEntity exampleEntity : list) {
    			ExampleResource exampleItem = new ExampleResource();
    			exampleItem.setStuff(exampleEntity.getTalky());
    			resList.add(exampleItem);
    		}
    		return resList;
    	}
    }
    ' > src/main/java/com/example/YOURPROJECT/ExampleJPARequest.java
    
You should normally separate the database layer and entity adapters from the request layer, which can do nicely with Jersey's dependency injection, whic we'll come to later.

We can again run the project to see it in action:

    gradle build
    java -jar jetty-runner-9.1.0.M0.jar --port 8081 build/libs/YOUR_PROJECT_DIR.war
    curl http://localhost:8081/YOUR_PATH/example_jpa/ONE && echo
    [{"stuff":"ONE"}]
    curl http://localhost:8081/YOUR_PATH/example_jpa/TWO && echo
    [{"stuff":"ONE"},{"stuff":"TWO"}]
