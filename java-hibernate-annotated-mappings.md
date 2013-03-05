title: Java: Hibernate p3: annotations
date: 2012-03-28 20:30:13
tags: java,java-hibernate

Instead of using a mapping XML file, we can use Java annotations. First make sure you have the dependencies for annotations and the simple logging facade used by hibernate when using annotations. You need:

* hibernate-annotations
* slf4j-api

Previously in the hibernate.cfg.xml file we had a reference to a mappings file. Remove that.

Now set up your hibernate configuration differently in your main java file. Now we now use AnnotationConfiguration, and add two files for annotation. There are different ways to add files for annotation, in XML etc.

		factory = new AnnotationConfiguration()
		    .addAnnotatedClass(Employee.class)
		    .addAnnotatedClass(Certificate.class)
			  .configure()
			  .buildSessionFactory();

Finally Annotate the class files. In Employee we say it's an @Entity, and state the @Table it belongs to. The @Id and @GenerateValue correspond to what we put in the XML file previously. The @Column annotation states its column name in the table.

		...
		import javax.persistence.*;

		@Entity
		@Table(name="employee")
		public class Employee {
			@Id @GeneratedValue
			@Column(name = "id")
			private long id = 1L;

		@Column(name = "name")
		private String name;


		@OneToMany(cascade=CascadeType.ALL, targetEntity=model.Certificate.class)
		@JoinColumn(name="employee_id")
		private Set certificates;
		...

The final variable says there'll be a one-to-many linkage. We state the targetEntity (we wouldn't need this if we we're using generics). Then we state the join column name in the Certificates table.

The rest of the file is the same as before. The Certificate file only differs as above:

		...
		import javax.persistence.*;

		@Entity
		@Table(name="certificate")
		public class Certificate {

			@Id @GeneratedValue
			@Column(name = "id")
			private long id = 1L;
			
			@Column(name = "cert_name")
			private String name;

Et Voila.
