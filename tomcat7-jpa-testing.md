Title: JPA: Testing
Tags: jpa|java-testing|jpa-testing|tomcat|junit
Date: 2013-02-17 10:09:09 -0500 
Author: Denevell


You can test your JPA code by setting aside another folder structure, test/ for example, with a META-INF/ directory with a new persistence.xml file there pointing to a different database.

Here's new new persistence.xml:

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
           <property name="javax.persistence.jdbc.url" value="jdbc:sqlite:/home/YOURUSERNAME/test.db" />
           <property name="eclipselink.logging.level" value="ALL" />
           <property name="eclipselink.ddl-generation" value="drop-and-create-tables" />
         </properties>
       </persistence-unit>
    </persistence>

The only different to the previous ones is that we're putting our database in a new location - one where the runner of the junit test has write access. And we're doing drop-and-create-tables in the table creation.

The next thing you need is the junit4 file that calls the persistence provider to test adding of the entity:

    public class JPAStarterTest {
      @Test
      public void addAnotherThing() {
        // Arrange
        AnotherThing at = new AnotherThing();
        at.setText("hii");        	
        // Act
        tx.begin();
        em.persist(at);
        tx.commit();   		    
        // Assert
        assertNotNull("Id should not be null", at.getId());
        List<AnotherThing> list = em.createNamedQuery("listAll", AnotherThing.class).getResultList();
        assertEquals("Table has one entity", 1, list.size()); 
        assertEquals("Table has correcttext", "hii", list.get(0).getText());
      }
    
      @BeforeClass
      public static void beforeClass() {
        emf = Persistence.createEntityManagerFactory("exampletest");
        em = emf.createEntityManager();
      }
     
      @AfterClass
      public static void afterClass() {
        em.close();
        emf.close();
      }
   
      @Before
      public void before() {
        tx = em.getTransaction();
      }
      private static EntityManagerFactory emf;
      private static EntityManager em;
      private EntityTransaction tx;	
    }

Now when you run this, ensure your new persistence.xml is in the META-INF/ directory of the classes.

