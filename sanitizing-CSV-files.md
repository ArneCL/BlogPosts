title: Sanitizing CSV files with regex
tags: unix,csv,regex,vim

Often, you want to use a CSV file, but commas within fields, double and single quotation marks can work trickily with some other programs.

0. The first regex will replace all commas in double quotation fields with unicode entity (only if such is not the first field, however)
0. The second will then remove all the double quotation marks
0. The third will replace the single quotation marks with their unicode entity

These are all in vim syntax.

    %s/\(,"[^\"]*\),\(.*"\)/\1\\u002C\2/
    %s/"//g
    %s/'/\\u0027/g
