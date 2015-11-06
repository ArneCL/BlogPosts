title: Replacing commas in fields in CSV files with regex
tags: sed, unix, csv, awk, regex, vim

Sometimes -- in Comma Separated Value files -- you have commas *inside* the fields themselves.

These means, should you run them through sed, awk or whatever, based on commas you'll have extra fields:

    afield,"another field","oh look, a false field",bugger

However, luckily, the field with the comma within is in double quotation marks.

This means we can run a regex to replace all such occurrances with the commas's HTML entity, ``&#44;``

The regex works like this:

0. Look for text that starts with ``,"``
0. Keep grabbing text, which is not the end of the qutotation mark, until we get a comma
0. Keep on grabbing again until we reach a double quotation mark

Then we can output the grabbed text between such and replace ``,`` with ``&#44;``

The regex, in vim syntax, looks like this:

    %s/\(,"[^\"]*\),\(.*"\)/\1\&#44;\2/

``\(`` and ``\(`` are the grouping, and the ``/\1&#44;\2/`` defines the replacement with the HTML entity, so they can be ignored for this explanation.

    ,"[^\"]*,.*"

Leaving us with ``,"`` saying start the match with such, then ``[^\"].*`` is saying only grab text that's not a double quotation mark.

Then, ``,`` is saying look for the comma in the quotation marks, and then ``.*"`` grabs everything until we get an ending quotation mark.

Then, since we're grouping everything except the comma, we can do the replacement: ``/\1\&#44;\2/``
