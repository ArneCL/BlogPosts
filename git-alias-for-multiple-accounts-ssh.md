title: Git: Alias for multiple Github accounts in SSH
tags: git

Say you have two github accounts. So you have different SSH keys. Github won't know which key relates to which account.

However, in your `~/.ssh/config` file you can setup an alias that uses the correct `IndentityFile` to send to github.

In that file, put this:

```
Host new_alias
        Hostname github.com
        User git
        IdentityFile ~/.ssh/id_rsa_new_identity
```

Now you can use `git remote origin git@new_alias:your_username/therepo.git` Note the `:` after the alias name. And the fact you're putting `git@` at the start.
