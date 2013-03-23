title: JSF2: Resources
tags: tomcat,tomcat-jsf,jsf-resources,jsf

We can reference resource we put in a 'resources' directory in the main 'web' or 'webapp' directory of your project. The css include below is in the subdirectory 'css', and the image is in the subdirectory images.

    <h:outputStylesheet library="css" name="default.css"/>
    ...
    <h:graphicImage value="#{resource['images:animage.png']}"/>
