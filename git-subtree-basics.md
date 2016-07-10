title: Git: Subtree basics
tags: git, git-subtree

If you hate `git submodule`, then you may want to give `git subtree` a try.

Let's say you have a git repository `init`'d with at least one commit.

You can add another repository to this respository like this:

0. First specify you want to add the subtree
0. Then specify the prefix directory into which you want to pull
0. Specify the remote repository
0. Specify the remote branch
0. Specify you want to squash all the remote repository's logs

In other words

    git subtree add --prefix .vimrepo https://github.com/newfivefour/vimrc.git master --squash

This will clone `https://github.com/newfivefour/vimrc.git` into the directory `.vimrepo`.

If you want to pull in any new commits to the subtree from the remote, issue the same command as above, replacing `add` for `pull`:

    git subtree pull --prefix .vimrepo https://github.com/newfivefour/vimrc.git master --squash

If you make a change to anything in `.vimrepo` the commit will be stored in the host repository and its logs.

That is the biggest change from submodules. 

If you now want to update the subtree repository with that commit, you must run the came command as above, excluding `--squash` and replacing `pull` for `push`.

    git subtree push --prefix .vimrepo https://github.com/newfivefour/vimrc.git master

I've only just starting playing, but my main problems so far:

0. You can't easily list the subtrees in your project
0. You can't, at least easily, list the remote repositories of the subtrees
0. The logs are slightly confusing when you update the host repository with subtree commits, then push the subtree to its host, and then pull the subtree.

Other than that, they're looking nicer than submodules.
