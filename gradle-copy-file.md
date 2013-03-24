title: Gradle: Copying files
tags: gradle, gradle-copy

The gradle Copy task helps here.

		task someTask(type:Copy) {
			from: 'some/dir'
			into: 'other/dir'
		}
