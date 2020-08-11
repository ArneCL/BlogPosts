title: Gradle: Hello world Java with a fat jar
tags: java,gradle,gradle-jar,java-jar
date: Mar 24, 2015

Create your build.gradle with your dependencies and a jar section that collects all your libraries into the jar and sets the Main class file.

    apply plugin: 'java'
    
    repositories {
       mavenCentral()
    }
    
    dependencies {
        compile 'org.mindrot:jbcrypt:0.3m'
    }
    
    jar {
        from {
            (configurations.runtime).collect {
                it.isDirectory() ? it : zipTree(it)
            }
        }
        manifest {
            attributes("Main-Class": "Main" )
        }
    }

Now create a basic hello world, using the library we imported:

    import org.mindrot.jbcrypt.BCrypt;

    public class Main {
            public static void main(String[] args) {
                    String password = BCrypt.hashpw("password", BCrypt.gensalt(10));
                    System.out.println(password);
            }
    }

Now build and run your jar:

    $ gradle clean build && java -jar build/libs/THE_NAME_OF_YOUR_JAR.jar
    ...
    $2a$10$R6q8LOed8LqXCOIhBnzhMecyebv/8v1urKjU76JMJGUctnZ8VkyZu
