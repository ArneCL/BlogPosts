title: Parsing XML from the command line
tags: xml,unix

First `apt-get install xmlstarlet`. And let's say we have this XML file:

```
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Yes</name>
  </Document>
  <Document>
    <name>No</name>
  </Document>
  <Document>
    <name>Maybe</name>
  </Document>  
</kml>
```

We can use `xmlstarlet sel` to select elements. But first we need to tell it about the name space, so `xmlstarlet sel -N x="http://www.opengis.net/kml/2.2"`.

Now let's use `-t -v` to start using some XPath. In our case `/x:kml/x:Document/x:name`. So in full `xmlstarlet sel -N x="http://www.opengis.net/kml/2.2" -t -v "/x:kml/x:Document/x:name" the_xml_file.xml`. This will print:

```
Yes
No
Maybe
```
