title: Git: Subtree tutorial
tags: git

Git submodules are a pain to deal with. Git subtrees are much nicer.

Let's start with your parent repo, and another repo, currently completely separate. The latter of these will be the subtree repo.

1) Let's add the repo like a normal repo: `git remote add my-subtree git@github.com:your_username/your_repo.git`.

2) Add the other repo as a subtree: `git subtree add --prefix=the_folder/ my-subtree master`.

That is, `git subtree add` and then the name of the folder it will live in and finally the repo name and branch.

3) Make a change to the files in `the_folder` and commit. Your parent repo, along with the files in the subtree, will be updated. But the subtree will not.

When you want update the files in the subtree repo run `git subtree push --prefix=the_folder my-subtree master`. And the same command but with `pull` to pull any new changes.

There are more things to learn, like whether you could squash commits and how all this relates to rebasing, but that's the basics.
