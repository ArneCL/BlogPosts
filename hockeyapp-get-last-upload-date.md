title: HockeyApp: Get date of last upload
tags: hockeyapp

You may want to find out when the last date of the last upload was.

With this data, you may want to use `git` to find all the last commits from that date, for example.

Get the last uploads with this:

    curl   -H "X-HockeyAppToken: $MY_TOKEN" "https://rink.hockeyapp.net/api/2/apps/YOURAPPID/app_versions"

Then use `sed`, `grep` and `head` on that to convert the `,`s to line breaks, remove the qutotation marks, find the `created_at` lines, list only the first therefore more recent one, and then remove everyting put the date:

    cat a | sed 's/,/\n/g' | sed 's/"//g' | grep created_at | head -n 1 | sed 's/created_at://'
    
You should then have something like `2016-08-12T10:40:46Z` which you have pass to `git log --since`.
