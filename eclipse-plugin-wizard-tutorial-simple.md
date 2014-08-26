title: Simple bare-bones Eclipse Plugin tutorial
tags: eclipse,eclipse-plugin

Here's how to create a plugin for eclipse that adds a wizard new option to your 'File -> New' options.

It does nothing. The File -> Plugin Development -> Plugin has more working examples that actually do things. 

This is just here to show you the framework.
.
First, create a new plugin project, 

    File -> New -> Other -> Plugin Development -> Plug-in Project 
    -> [Enter project name, accept defaults on this screen] 
    -> [Accept default on next screen] 
    -> [Unclick "Create a plugin using one of the templates] 
    -> Finish
    
Now you have a blank plugin project.

You'll have a src directory with a Activator.java that deals with the lifecycle, that you can leave alone pretty much.

In META-INF/ there's a MANIFEST.MF file. 'Build-SymbolicName' to a singleton for plugin development and change the 'Require-Bundle' by adding some useful packages:

    Manifest-Version: 1.0
    Bundle-ManifestVersion: 2
    Bundle-Name: YOURPACKAGE
    Bundle-SymbolicName: YOURPACKAGE;singleton:=true
    Bundle-Version: 1.0.0.qualifier
    Bundle-Activator: YOURPACKAGE.Activator
    Require-Bundle: org.eclipse.ui,
     org.eclipse.core.runtime,
     org.eclipse.core.resources,
     org.eclipse.ui.ide
    Bundle-RequiredExecutionEnvironment: JavaSE-1.7
    Bundle-ActivationPolicy: lazy

The final file you are given is build.properties. When you add new files or directories, you need to add them to the bin.includes values. Let's do that now, refering to a plugin.xml file we'll create below:

    source.. = src/
    output.. = bin/
    bin.includes = META-INF/,\
                   .,\
                   plugin.xml

You need to add a plugin.xml, at the same level as build.properties, so you can register your plugin:

    <?xml version="1.0" encoding="UTF-8"?>
    <?eclipse version="3.4"?>
    <plugin>
    
       <extension
             point="org.eclipse.ui.newWizards">
          <category
                name="ITSNAME"
                id="ITSNAME">
          </category>
          <wizard
                name="ITSNAME"
                category="ITSNAME"
                class="ITSPACKAGE.Yeah"
                id="ITSNAME.yeah">
          </wizard>
       </extension>
    
    </plugin>

The XML file should be fairly self-explanatory. The 'class' property refers to a file, Yeah.java, that we haven't defined as yet. Let's do that now.

    package ITSPACKAGE;
    
    import org.eclipse.jface.viewers.IStructuredSelection;
    import org.eclipse.jface.wizard.Wizard;
    import org.eclipse.jface.wizard.WizardPage;
    import org.eclipse.swt.SWT;
    import org.eclipse.swt.widgets.Composite;
    import org.eclipse.ui.INewWizard;
    import org.eclipse.ui.IWorkbench;
    
    public class Yeah extends Wizard implements INewWizard {
    
    	@Override
    	public void init(IWorkbench workbench, IStructuredSelection selection) {
    	}
    	
    	@Override
    	public void addPages() {
    		addPage(new WizardPage("yeah_page", "Yeah, innit", null) {
    			@Override public void createControl(Composite parent) {
    				setControl(new Composite(parent, SWT.NULL));
    			}
    		});
    	}
    
    	@Override
    	public boolean performFinish() {
    		return true;
    	}
    
    }
    
We're extending Wizard to give us a wizard when we open our plugin. 

The init() method gives us a reference to a IStructuredSelection which is useful to get the selected directory, for example.

The adPages() method makes us create a new page, in this case we've just added a blank page -- we'd extend this obviously to include our UI.

Finally, performFinish() is called when the user presses the 'Finish' button in the wizard.

Now, if you right click on the plugin project, and run as Eclipse Application, you'll get a new instance of Eclipse with the plugin loaded. 

Now create a new Java project. Then on the 'src' directory, for example, right click -> New -> Other. Now you can find your plugin.

It does nothing! Glorious!
