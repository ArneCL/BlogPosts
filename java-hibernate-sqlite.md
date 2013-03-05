title: Java: Hibernate p1: with SQLite 
date: 2012-03-26 18:30:13
tags: java,java-hibernate

First hibernate needs a small army of jars. You need:

* hibernatesqlite
* hibernate-entitymanager
* sqlite-jdbc

Now create a sqlite3 database in your current directory. Give it an id for the primary key and a text name column.  Call them 'id' and 'name'. Name the table employee. Name the file dby.db.

Then in src/main/resources create your hibernate.cfg.xml file. This states you're going to use a sqlite db, your using it the reference to the db your previously created, and your specifying a mapping that we'll get to next.

		<?xml version="1.0" encoding="utf-8"?>
		<!DOCTYPE hibernate-configuration SYSTEM 
		"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

		<hibernate-configuration>
		   <session-factory>

		   <property name="hibernate.dialect">
		      com.applerao.hibernatesqlite.dialect.SQLiteDialect
		   </property>
		   <property name="hibernate.connection.driver_class">
			  org.sqlite.JDBC
		   </property>
		   <property name="hibernate.connection.url">
			jdbc:sqlite:dby.db
		   </property>

		   <mapping resource="Employee.hbm.xml"/>

			</session-factory>
		</hibernate-configuration>
	
In the same directory we're going to create that mapping between your DB and a java class.

		<?xml version="1.0" encoding="UTF-8"?>
		<!DOCTYPE hibernate-mapping PUBLIC "-//Hibernate/Hibernate Mapping DTD 3.0//EN" 
		"http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd">
		<hibernate-mapping>
		<class name="model.Employee" table="employee">
			<id name="id" column="id" type="long">
				<generator class="native"></generator>
			</id>
			<property name="name" column="name" type="string"></property>
		</class>
		</hibernate-mapping>

It's saying we have a class called employee in Employee, which relates to the employee take in the database. It say it has both a id and a name property, which are of the type long and string respectively. The id tag uses the generator native to say make it autoincrement.

Now we need to actually create that class, src/main/java/model/Employee.java. It a Plain Old Java Object.

		package model;

		public class Employee {
			
			private long id = 1L;
			
			private String name;
			
			public Employee() {
			}

			public Employee(String fname) {
				name = fname;
			}

			public long getId() {
				return id;
			}

			public void setId(Long id) {
				this.id = id;
			}

			public String getName() {
				return name;
			}

			public void setName(String name) {
				this.name = name;
			}
		}

Now we need to create our class that actually deals with that. We first create a SessionFactory. This allows us to make session requests that actually talk to the DB:

		try{
		 mFctory = new Configuration().configure().buildSessionFactory();
		}catch (Throwable ex) { 
		 System.err.println("Couldn't create session factory." + ex);
		 throw new ExceptionInInitializerError(ex); 
		}

Now we have that we can use it to save an Employee we make. 

		Session session = mFactory.openSession();
		Transaction tx = null;
		Long employeeID = null;
		try{
		 tx = session.beginTransaction();
		 Employee employee = new Employee(fname);
		 employeeID = (Long) session.save(employee); 
		 tx.commit();
		}catch (HibernateException e) {
		 if (tx!=null) tx.rollback();
		 e.printStackTrace(); 
		}finally {
		 session.close(); 
		}

We first get open a session via the factory, then begin a transaction, save your employee to that session, and commit it. The Employee should not be saved to the database.      

Getting objects from the database is very much the same:

		 List employees = session.createQuery("FROM Employee").list(); 

We're create a query with HQL that gets everything from 'Employee'.

Updating a query is a matter of getting the object from the session variable, and then setting that to update:

		 Employee employee = (Employee)session.get(Employee.class, itsID); 
		 session.update(employee); 

Deleting is the same, except you run session.delete() in place of session.update().
