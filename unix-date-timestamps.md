title: Timestamps in unix with the date command
tags: unix,unix-date

If you need the textual date, "date", will suffice.

If you need it in RFC2822, "date -R" will do that.

If you need it in unix format, "date +"%s" will do that.

And finally, a format the fits well with file names is "date +"%F"

Examples:

    $ date
    Mon 23 Jun 08:45:15 BST 2014
    $ date -R
    Mon, 23 Jun 2014 08:45:18 +0100
    $ date +"%s"
    1403509524
    $ date +"%F"
    2014-06-23

To enter any of these in the command line:

    touch hi_$(date +"%F")_there.txt
