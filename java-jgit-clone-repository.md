Tags: java|git
Title: Java: Using JGit to clone a repository
date: Mar 2, 2013

So

	Git.cloneRepository()
		.setURI(remoteRepo)
		.setDirectory(dir)
		.call();

remoteRepo will be something like "git@github.com:denevell/BlogPosts.git" and dir is a File object stating where to put the new repository.

If the directory doesn't exist, you must create it with dir.mkdirs();
