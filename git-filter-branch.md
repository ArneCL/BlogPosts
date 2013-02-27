Title: Git: Filter-branch
Tags:  git|git-filter-branch
Date: 2012-12-07 14:47:01 -0500 
Author: Denevell


If you have some file you want deleted from the entire history, use filter-branch.

     git filter-branch --index-filter 'git rm --cached --ignore-unmatch thefile'

You can specify HEAD~5 etc after the above if you want to remove it from certain revisions.

It will **rewrite the entire history of your repository** via the filter given. So it will only be shown on your repository and the remote repository. Anyone else will still have the file. And if they merge or pull your changes, you'll shaft your repository, since your 'new' history will be added to their history.

After that you must run git push origin master --force. Force is important lest your repo will complain about the history rewriting.

To delete all the references from the git information in your repo, run:

     rm -rf .git/refs/original/
     git reflog expire --expire=now --all
     git gc --prune=now
     git gc --aggressive --prune=now

