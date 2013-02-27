Title: JPA: Named queries
{{wl-tags:jpa|java|tomcat|jpa-namedqueries}}
{{wl-publish: 2013-02-17 09:39:07 -0500 | Denevell }}

On your entity class if you put this below the @Entity annotation,

    @NamedQuery(name="listAll",query="select tings from AnotherThing tings")

Then that will get all the AnotherThings from all the AnotherThings objects in the system.
You can call this via:

    TypedQuery<AnotherThing> q = em.createNamedQuery("listAll", AnotherThing.class);
    List<AnotherThing> results = q.getResultList();
    for (AnotherThing thing : results) {
    }
