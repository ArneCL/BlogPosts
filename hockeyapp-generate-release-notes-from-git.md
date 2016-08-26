title: HockeyApp: Generating release notes from git
tags: hockeyapp,git,travis-ci

The problem with uploading to HockeyApp is the release notes are not automatically created.

And we can create them by looking at all the git commit logs since the last build.

For this to happen we need to know what the last commit was. 

Although we can specify this in our upload, when we query the builds we can't get this information back. Instead, we'll add the commit SHA to the release notess.

Our plan will be

0. Look at the app versions via HockeyApp's API
0. Find the lastest version
0. Look at the release notes that and retrieve our added commit SHA
0. Make git output all our commit logs since then
0. Make release notes out of that (including the current git commit)

Here's the entire commented shell script:

    # We need an initial bullet point for our list of commit logs
    echo -n "* "
    # Get the latest app uploads
    curl -H "X-HockeyAppToken: $HOCKEYAPP_TOKEN" \
    "https://rink.hockeyapp.net/api/2/apps/e1e4c963ad144f23a8787ac79c3d1954/app_versions?page=1" | \
    # Put every property on a separate line
    sed 's/,/\n/g' | \
    # Remove all the quotation marks
    sed 's/"//g' | \
    # Look at only the notes properties
    grep notes | \
    # Look at the first one, i.e. the latest app upload
    head -n 1 | \
    # Find the commit information at the bottom of the notes
    sed -n 's/.*(commit:\([^)]*\)).*/\1/p' | \
    # Let's find all the logs since that commit
    xargs -I '{}' git log {}..HEAD --pretty=format:'%s' --no-merges | \
    # Turn this newlines into <br>s since we need to pass this all as one line
    sed ':a;N;$!ba;s/\n/<br><br>* /g'
    # The end of the revision log must have the latest commit
    # This is so later we can do the above again
    echo -n "<br>(commit:" 
    git rev-parse HEAD | xargs echo -n
    echo -n ')'


And when we upload to HockeyApp, via travis-ci, we can include it like so:

    - export RELEASE_NOTES=`bash release_notes_for_hockeyapp.sh`
    - >
      curl
      -F "status=2"
      -F "notify=1"
      -F "notes=$RELEASE_NOTES"
      -F "notes_type=0"
      -F "ipa=@app/build/outputs/apk/YOURAPP.apk"
      -H "X-HockeyAppToken: $HOCKEYAPP_TOKEN"
      https://rink.hockeyapp.net/api/2/apps/upload
