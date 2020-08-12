title: JSF2: Resources
tags: java-jsf,java-jsf-resources,java
date: 2013-03-23 20:48:00

We can reference resource we put in a 'resources' directory in the main 'web' or 'webapp' directory of your project. The css include below is in the subdirectory 'css', and the image is in the subdirectory images.

    <h:outputStylesheet library="css" name="default.css"/>
    ...
    <h:graphicImage value="#{resource['images:animage.png']}"/>
