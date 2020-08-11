title: Java: Testing a REST service with a clean database (using sqlite)
tags: java,java-testing,java-jersey,java-jpa
date: 2013-03-22 19:59:00

You can test REST responses like so with Jersey's client api.

		YourResponseObject result = service
			.path("somepath")
			.type(MediaType.APPLICATION_JSON)
			.put(YourResponseObject.class, yourInputObject);

		assertTrue(result.isSuccessful());

But your responses may depend on the state of your database. 

And since you're not running your tests from a WAR, or what have you, you have no direct access to populate its seed or delete it.

The best way to do this is to create a rest method to clear the database to use during development, and remove in production. 

The method to delete the database would look like:

		EntityTransaction trans = mEntityManager.getTransaction();
		trans.begin();
		Query q = mEntityManager.createQuery("delete from UserEntity");
		q.executeUpdate();
		trans.commit();
		closeEntityConnection();
		
It may be possible access the JPA database if the tests are run in a WAR, but I haven't tried that. Any experience would be welcomed in the comments.
