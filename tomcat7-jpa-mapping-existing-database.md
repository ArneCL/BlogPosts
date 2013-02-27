Title: JPA: Mapping to an existing database
Tags: java|jpa|tomcat|jpa-databasemapping
Date: 2013-02-18 18:11:16 -0500 
Author: Denevell


In your persistence.xml you can specify an XML mapping file. Anything in this will overrule whatever is in your annotations.

Let's say the a column name is changed in a UAT database, but not in production. You can create a mapping file that remaps the annotation for the UAT database, by specifying this in your persistence.xml under the persistence-unit tag:

   <mapping-file>META-INF/db_mapping.xml</mapping-file>

In that file you can set remap the column like so:

    <?xml version="1.0" encoding="UTF-8" ?>
    <entity-mappings xmlns="http://java.sun.com/xml/ns/persistence/orm"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://java.sun.com/xml/ns/persistence/orm    http://java.sun.com/xml/ns/persistence/orm_2_0.xsd"
        version="2.0">
        <entity class="org.denevell.tomcat.entities.write.AnotherThing">
           <table name="anotherthing" />
           <attributes>
             <basic name="text">
               <column name="sometext" nullable="false" />
             </basic>
           </attributes>
        </entity>
    </entity-mappings>

After the car-crash of schema declarations, the entity specifies which class to map, to what table, and then the attributes within. The basic tag tells us the name of the property or field in your Java class. Then the column tags tell you want to map it to.
