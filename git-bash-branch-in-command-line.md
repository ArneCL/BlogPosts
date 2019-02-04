title: Git: Seeing the current branch in your command line
tags: unix,git

You can make a file in your home directory called `.bash_profile` if it doesn't already exist.

This also work on Mac OS X.

Then add the following to the bottom.

```
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
export PS1="\u@\h \W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
```

Then type `source ~/.bash_profile`.

Now your Teminal will tell you git what git branch you're in, if you're in a git repo.
