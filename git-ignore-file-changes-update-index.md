Title: Git: Ignoring changes to tracked files, update-index
Tags: git|git-update-index
Date: 2012-12-07 16:44:43 -0500 
Author: Denevell


You may have a file which you want under source control, but you don't want its changes tracked. You can tell git - in this repository only - to ignore such changes.

I have a 'twitter secret keys' file that a build script modifies to insert the keys. I don't want those changes visible on the public repository.

You can tell git to ignore future changes via:

     git update-index --assume-unchanged twitter_secrets_file.txt

Note that if you change branches or reset, it will moan if this has been changed anyway. You'll have to git checkout it to revert any changes.
