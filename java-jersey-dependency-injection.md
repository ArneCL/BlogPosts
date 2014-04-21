title: PART 4: Jersey 2 and Dependency Injection with HK2
Tags: java,JPA,java-web-quick-start,jersey,jsr330

(This is part of a series http://blog.denevell.org/category_java-web-quick-start.html)

Previously, we had the JPA and adapter code in the request object. This was obviously not ideal.

Jersey 2 comes with a JSR330 (dependency injection) implementation baked in, named HK2, so we can move the JPA model code and the adapter code into separate objects and inject them in.

Let's start with a simple object that will adapt the list of JPA entities into a resource entities (same code as before).

    echo '
    package com.example.YOURPROJECT;
    
    import java.util.ArrayList;
    import java.util.List;
    
    public class ExampleResourcesAdapter {
    	
    	public List<ExampleResource> adapt(List<ExampleEntity> list) { 
    		ArrayList<ExampleResource> resList = new ArrayList<ExampleResource>();
    		for (ExampleEntity exampleEntity : list) {
    			ExampleResource exampleItem = new ExampleResource();
    			exampleItem.setStuff(exampleEntity.getTalky());
    			resList.add(exampleItem);
    		}
    		return resList;
    	}
    
    }
    ' > src/main/java/com/example/YOURPACKAGE/ExampleResourceAdapter.java
    
Now let's move the JPA stuff into its own model. In this case we're also using an interface, although we don't have to for the DI to work. (Same  JPA code as before, but without the comments)

    echo '
    package com.example.YOURPROJECT;
    
    import java.util.List;
    
    public interface AddListModel {
        List<ExampleEntity> addAndList(String someString);
    }
    ' > src/main/java/com/example/YOURPACKAGE/AddListModel.java

And now for the implementation of the interface.

    echo '
    package com.example.YOURPROJECT;
    
    import java.util.List;
    
    import javax.persistence.EntityManager;
    import javax.persistence.EntityTransaction;
    import javax.persistence.Persistence;
    import javax.persistence.TypedQuery;
    
    import org.apache.log4j.Logger;
    
    public class AddListModelImpl implements AddListModel {
    
    	@Override
    	public List<ExampleEntity> addAndList(String someString) {
    		EntityManager entityManager = Persistence.createEntityManagerFactory("PERSISTENCE_UNIT_NAME").createEntityManager();
    		EntityTransaction transaction = entityManager.getTransaction(); 
    		List<ExampleEntity> list = null;
    		try {
    			transaction.begin();
    			ExampleEntity entity = new ExampleEntity();
    			entity.setTalky(someString);
    			entityManager.persist(entity);
    			TypedQuery<ExampleEntity> nq = entityManager.createNamedQuery("list", ExampleEntity.class);
    			list = nq.getResultList();
    			transaction.commit();
    		} catch (Exception e) {
    			Logger.getLogger(getClass()).error("Problem persisting", e);
    			transaction.rollback();
    			throw e; 
    		} finally {
    			entityManager.clear(); 
    			entityManager.close();
    		}		
    		return list;
    	}
    
    }
    ' > src/main/java/com/example/YOURPACKAGE/AddListModelImpl.java
    
Now we have these objects, we need to tell the dependency injector about them. We do this using a AbstractBinder class.

(I think there's an automatic method for this, using annotations, but this is the only way I've got working.)

    echo '
    package com.example.YOURPROJECT;
    
    import org.glassfish.hk2.utilities.binding.AbstractBinder;
    
    public class DependencyBinder extends AbstractBinder {
    
    	@Override
    	protected void configure() {
    		bind(AddListModelImpl.class).to(AddListModel.class);
    		bind(ExampleResourcesAdapter.class).to(ExampleResourcesAdapter.class);
    	}
    
    }
    ' > src/main/java/com/example/YOURPACKAGE/DependencyBinder.java

Note we're binding the iplementatioon of the model interface on the first bind line. And on the second just binding two concreate classes together.

We need to tell Jersey about this AbstractBinder, so in your JerseyApplication.java class you need to register it:

    register(new DependencyBinder());

Now we can see the new request has two @Inject lines and is much, much shorter (also has a new @Path)

    echo '
    package com.example.YOURPROJECT;
    
    import java.util.List;
    
    import javax.inject.Inject;
    import javax.ws.rs.GET;
    import javax.ws.rs.Path;
    import javax.ws.rs.PathParam;
    import javax.ws.rs.Produces;
    import javax.ws.rs.core.MediaType;
    
    @Path("example_jpa_di")
    public class ExampleJPAWithDIRequest {
    	
    	@Inject AddListModel mModel;
    	@Inject ExampleResourcesAdapter mAdapter;
    
    	@Path("{example}")
    	@GET
    	@Produces(MediaType.APPLICATION_JSON)
    	public List<ExampleResource> example(@PathParam("example") String example) {
    		List<ExampleEntity> list = mModel.addAndList(example);
    		List<ExampleResource> resList = mAdapter.adapt(list);
    		return resList;
    	}
    }
    ' > src/main/java/com/example/YOURPACKAGE/ExampleJPAWithDIRequeset.java
    
We can run it, and it'll have the same result as before (note the different url for the request)

    gradle build
    java -jar jetty-runner-9.1.0.M0.jar --port 8081 build/libs/YOUR_PROJECT_DIR.war
    
If you visit 
    
    http://localhost:8081/YOUR_PATH/example_jpa_di/ONE
    
and then visit
    
    http://localhost:8081/YOUR_PATH/example_jpa_di/TWO

You should see the JSON, (should the database be blank before starting)

    [{"stuff":"ONE"},{"stuff":"TWO"}]
