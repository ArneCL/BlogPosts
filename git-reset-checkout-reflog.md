Title: Git: Reset, Checkout and Reflog
Tags: git|git-reset|git-checkout|git-reflog
Date: 2012-12-04 12:26:09 -0500 
Author: Denevell


f you want to remove all your changes you haven't committed:

     git reset --hard HEAD
     
If you reset to a previous revision your history, but not overwriting your files

     git reset SHA1
     
If you just want to revert a file to what it was in the last commit

     git checkout the_file
     
(You're checking the committed version over your current version.)

Then if you want to go back before you reset, look at git reflog then do something like

     git reset HEAD@{1} 
     
Where the HEAD@{1} was a reference from running 'git reflog'. To revert that again, it's usually HEAD@{1} again, since HEAD@{1} is now the point before you ran git reset. 

