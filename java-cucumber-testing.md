Title: Java Cucumber testing
Tags: java|java-testing|cucumber
Tags: java|ant|java-testing|cucumber
Date: 2013-01-16 10:40:49 -0500 
Author: Denevell


Make a product directory with bin/ and lib/ directories within.

You need the cucumber-jvm (https://github.com/cucumber/cucumber-jvm) libs in the lib/ folder. You need:

    * cucumber-core-1.1.1.jar  
    * cucumber-html-0.2.2.jar  
    * cucumber-java-1.1.1.jar  
    * cucumber-junit-1.1.1.jar  
    * junit-4.11.jar

I got these via Apache Ant. You can use Maven, or the Ant build script that comes with the hello world example in the cucumber-jvm repository.

Next you need to write the features file. Put this in the main directory:

     Feature: Hello World
     
      Scenario: Print my shopping list
        The list should be printed in alphabetical order of the item names
     
        Given a shopping list:
          | name  | count |
          | Milk  |     2 |
          | Cocoa |     1 |
          | Soap  |     5 |
        When I print that list
        Then it should look like:
          """
          1 Cocoa
          2 Milk
          5 Soap
     
          """

The lines starting Given, When and Then are parsed by Cucumber. You need to write step definitions for these. Create a file called ShoppingStepdefs.java in your main folder:

     import cucumber.api.java.en.Given;
     import cucumber.api.java.en.Then;
     import cucumber.api.java.en.When;
     
     import java.util.List;
     
     import static org.junit.Assert.assertEquals;
     
     public class ShoppingStepdefs {
        private StringBuilder printedList; 
        private final ShoppingList shoppingList = new ShoppingList();

The above line initialises the class we'll be testing (to be defined later).

      public static class ShoppingItem {
          private String name;
          private Integer count;
      }

This is used for grabbing list data. See below.

      @Given("^a shopping list:$")
      public void a_shopping_list(List<ShoppingItem> items) throws Throwable {
          for (ShoppingItem item : items) {
              shoppingList.addItem(item.name, item.count);
          }
      }

This defines the Given line above, the one with 'a shopping list' as its text. The ":" means we'll be taking in an object. "^" and "$" end the definition. 

We take in the | Milk  |     2 | in the feature file as a List<ShoppingItem> as a parameter. Then in the method we go through each adding it to the shoppingList initialised earlier.
 
      @When("^I print that list$")
      public void I_print_that_list() throws Throwable {
          printedList = new StringBuilder();
          shoppingList.print(printedList);
      }

Then we define the 'When' line. This simply takes the output of the shoppingList and puts it the printedList StringBuilder as defined above.
 
      @Then("^it should look like:$")
      public void it_should_look_like(String expected) throws Throwable {
          assertEquals(expected, printedList.toString());
      }

Then final 'Then' statement takes in a string as a parameter and compares it to the output of the printedList.
 
     }

Now we need the ShoppingList class. Put it in the root folder:

     import java.io.IOException;
     import java.util.Map;
     import java.util.SortedMap;
     import java.util.TreeMap;
     
     public class ShoppingList {
        private SortedMap<String,Integer> items = new TreeMap<String, Integer>();
     
        public void addItem(String name, Integer count) {
            items.put(name, count);
        }
     
        public void print(Appendable out) throws IOException {
            for (Map.Entry<String, Integer> entry : items.entrySet()) {
                out.append(entry.getValue().toString()).append(" ").append(entry.getKey()).append("\n");
            }
        }
     }

Now you need a build.xml file to run the tests via ant (I've omitted things like clean for clarity):

     <project name="java-helloworld" basedir="." default="runcukes">
     
        <property name="jars" value="lib"/>
     
        <target name="classpath">
            <path id="classpath">
                <fileset dir="${jars}">
                    <include name="**/*.jar"/>
                </fileset>
                <pathelement location="bin/classes"/>
            </path>
        </target>
     
        <target name="compile" depends="classpath">
            <mkdir dir="bin/classes"/>
            <javac srcdir="." destdir="bin/classes" classpathref="classpath" includeantruntime="false"/>
        </target>

The above just compiles the java files into classes and sets the classpath.

        <target name="runcukes" depends="compile">
            <mkdir dir="bin/cucumber-junit-report"/>
            <java classname="cucumber.api.cli.Main" fork="true" failonerror="false" resultproperty="cucumber.exitstatus">
                <classpath refid="classpath"/>
                <arg value="--format"/>
                <arg value="junit:bin/cucumber-junit-report/allcukes.xml"/>
                <arg value="--format"/>
                <arg value="pretty"/>
                <arg value="--format"/>
                <arg value="html:bin/cucumber-html-report"/>
                <arg value="--glue"/>
                <arg value=""/>
                <arg value="."/>
            </java>

This runs the cucumber tests via running cucumber.api.cli.Main with various arguements that point to the location of our feature file and sets various reporting and formatting features.

          <junitreport todir="bin/cucumber-junit-report">
              <fileset dir="bin/cucumber-junit-report">
                  <include name="allcukes.xml"/>
              </fileset>
              <report format="frames" todir="bin/cucumber-junit-report"/>
          </junitreport>

This next part runs junit on the junit that cucumber produced, failing if we have errors. The hello-world sample project has a fail tag here, but I haven't found it to be needed, so I've omitted it here.

        </target>
     
     </project>

Now run 'ant' in the directory and voila:

     runcukes:
         [java] Feature: Hello World
         [java] 
         [java]   Scenario: Print my shopping list # helloworld.feature:3
         [java]     The list should be printed in alphabetical order of the item names
         [java] 
         [java]     Given a shopping list:         # ShoppingStepdefs.a_shopping_list(List<ShoppingStepdefs$ShoppingItem>)
         [java]     When I print that list         # ShoppingStepdefs.I_print_that_list()
         [java]     Then it should look like:      # ShoppingStepdefs.it_should_look_like(String)
         [java]       """
         [java]       1 Cocoa
         [java]       2 Milk
         [java]       5 Soap
         [java] 
         [java]     Then it should look like:      # ShoppingStepdefs.it_should_look_like(String)
         [java]       """
         [java]       1 Cocoa
         [java]       2 Milk
         [java]       5 Soap
         [java] 
         [java]       """
         [java] 

You'll see errors in this output should there be a failure.
