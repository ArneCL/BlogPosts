Title: Gradle: Zipping files 
Tags: gradle,gradle-zip

If you put 

        apply plugin:'java'

at the top of your build.gradle file you can run 'gradle zip' with the following:

		task zip(type: Zip) {
		    archiveName = "ItsName.zip"
		    from projectDir
		    include 'somedir/**/*'
		    include 'filefile.txt'
		    include '*.others'
		}

Your zip will be available at build/distributions/.
