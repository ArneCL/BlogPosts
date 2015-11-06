title: Using AWK to work with CSV files
tags: unix,awk,csv

Should you have a CSV file, you may want to convert that into another form.

AWK can help there. Here's the basic AWK command for CSV files:

    awk -v q="'" --field-separator ',' '{print q $1 $2 q}'

We're saying, be verbose ``-v``, use ``'`` as the variable ``q`` (sometimes this is useful) and separate the fields using ``,``.

Then the work in ``{}`` is where is all happens. In this case we're using ``print`` to print.

We're printing first and the second field with no spaces inbetween (either a blank place in double quotation marks or a comma will give a space). We also use ``q`` to add a single quotation mark.

For example, given this CSV data in sample.csv:

    david,jones,mastermind
    chris,buckly,ethereal spirit
    duncan,christmas,postman

This awk command  ``cat sample.csv | awk -v q="'" --field-separator ',' '{print q $3 "=" $1 q}'`` will output:

    'mastermind=david'
    'ethereal spirit=chris'
    'postman=duncan'
    
If you use AWK's print to format a unix command, you can then pipe awk's output to ``bash`` and run that command.
