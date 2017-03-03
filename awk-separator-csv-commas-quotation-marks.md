title: Using AWK with CSV files with commas inbetween quotation marks
tags: awk,csv

Sometimes you'll get a CSV like: `Here is something, And another thing, "OH LOOK, A COMMA WITHIN QUOTATION MARKS", something else`.

This is annoying, since a normal awk separator like `-F ,` will not work. But in modern version of awk, you can use `-FPAT` to use a regular expression.

Use `awk -vFPAT='[^,]*|"[^"]*"'`. This says you're either looking for a field that ends in a comma, or looking for anything that begins and ends with quotation marks.

