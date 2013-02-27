Title: Unix commands: cut and paste
Tags: unix|unix-cut|unix-paste
Date: 2012-12-02 10:49:57 -0500 
Author: Denevell

    cat textfile | cut -d$'\t' -f1

This will separate fields in textfile by a tab character, and display only the first field. (Only works in bash, not plain sh, due to $'\t' I believe)

    cat textfile | paste -s --delimiters=','

This will join all the lines in a text file (-s) using the delimiter ','.
