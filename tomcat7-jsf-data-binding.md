title: JSF2: Databinding with ManagedBeans
tags: java,java-jsf,java-jsf-resource-bundle
date: 2013-04-02 20:23:15

First create a standard POJO with a @ManagedBean annotation so it can be accesssed via databinding. Give it a @SessionScoped annotation to say it exists for the entirity of the user's session:

		import java.io.Serializable;
		import javax.faces.bean.ManagedBean;
		import javax.faces.bean.SessionScoped;

		@ManagedBean
		@SessionScoped
		public class SomeData implements Serializable {

		    private String name = "";

		    public SomeData() {
		    }

		    public String getName() {
			return name;
		    }

		    public String getNameInfo() {
			if(name.equals("Dave")) {
				return "David, huh. Intereseting...";
			} else {
				return "Hmmm! Nothing on you.";
			}	
		    }

		    public void setName(String user_name) {
			this.name = user_name;
		    }
		}

Now in your JSF page you can edit the name variable by the following InputText and see it's result also:

		<h:form>
		    <h:inputText value="#{someData.name}">
		    </h:inputText>
		</h:form>
		#{someData.name} 
		<br />
		#{someData.nameInfo}
		</h:body>
