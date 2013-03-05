title: Java: Hibernate p2: mappings
date: 2012-03-28 18:30:13
tags: java,java-hibernate


To create a mapping, a one to many in this case, we first need to edit the src/main/resources/Employee.hbm.xml file to state the mapping.

		<class name="model.Employee" table="employee">
			<id name="id" column="id" type="long">
				<generator class="native"></generator>
			</id>
			<property name="name" column="name" type="string"></property>
			    <set name="certificates" cascade="all">
				 <key column="employee_id"/>
				 <one-to-many class="model.Certificate"/>
			    </set>      
		</class>

		<class name="model.Certificate" table="certificate">
		      <id name="id" type="long" column="id">
			 <generator class="native"/>
		      </id>
		      <property name="name" column="cert_name" type="string"/>
		 </class>

Note the new set tag. This means we'll store the new classes in a java Set. We give it a name that will relate to the name in the Certificate class we'll make. cascade=all means that we'll persist the Certificates as the same time as Employee. We then set the key column in our to-be-created certificate table, and the fact it's going to be a one-to-many table using the class as model.Certificate. We finally create a new class tag that is the same as the one we created in the previous tutorial.

The Employee class we defined before only changes in that we create a new Set of the Certificate classes, and make the setters and getters.

		...
		private Set certificates;
		...
		public Set getCertificates() {
		    return certificates;
		}
		public void setCertificates(Set certificates) {
		    this.certificates = certificates;
		} 
		...   


Now here's the Certificate class:

		package model;

		public class Certificate {

			private long id = 1L;
			
			private String name;
			
			public Certificate() {
			}

			public Certificate(String fname) {
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

It's possible that you may need to implement compareTo() and hashCode() in some instances.

Now in the main class file, First create a Set with the certificates in, then you can add them to the Employee, and then save the employee.

		HashSet set = new HashSet();
		Certificate cert = new Certificate("some python shit");
		Certificate cert1 = new Certificate("some go shit");
		set.add(cert); set.add(cert1);

		...

		Employee employee = new Employee("name");
		employee.setCertificates(set);
		employeeID = (Long) session.save(employee);       

When you delete an employee, it will also delete its certificates.
