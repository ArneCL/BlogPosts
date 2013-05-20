title: Gradle: Add an attribute to MANIFEST.MF in a WAR file
tags: gradle-war,gradle

You can use the manifest property in a Gradle War task to add an attribute to MANIFEST.MF.

The below does just that, creating a new war files [Your Project Name]-Something.war with the added manifest.mf attribute.

		task createAWarFile(type: War) {
		  classifier = 'Something'
		  manifest { attributes "HI": "THERE" }
		}


