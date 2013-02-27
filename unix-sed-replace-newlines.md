Title: Unix: Replace newlines with sed
Tags: unix|unix-sed

Imagine we have this file 

    Line one
    
    
    Line two

And we want to remove the double new line.

This ugly looking command will replace all the newlines with nothing.

    sed ':a;N;$!ba;s/\n\n//' unix-zip.md

The :a says create a label - we'll need this in a moment.

The N says append the next line onto the current pattern - we need this since we're matching two lines. So say we're trying to match the double newline this will give us '\n\n' in our pattern space.

The $ matches the last line, i.e. in '\n\n' we'll be right at the end. And the ! inverts that. So here's we're matching the first '\n' since this is not the last line.

Then the ba means go back to our label that we just created. So if we're not on the last line, go back and do the match on the next part. This seems to be so the newline doesn't halt the match.
