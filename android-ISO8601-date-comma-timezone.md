title: Converting ISO8601 dates in Android
tags: android

These dates look like this: 2013-12-25T23:59:59+01:00

These can't be converted using SimpleDateFormat because of the timezone, '+01:00', that is a plus and a 'comma' in the timezone.

This can also be 'Z' - just to mess with people trying to solve the problem using reg exs, I'd guess. See https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators

'DatatypeFactory' has solved this problem for you, however.

    DatatypeFactory.newInstance().newXMLGregorianCalendar("2013-12-25T23:59:59+01:00").toGregorianCalendar();
    
Now you have Calendar object you can play with.
    
This only works for API 8 and above. There are stackoverflow posts with code for those who are working with lesser APIs.
