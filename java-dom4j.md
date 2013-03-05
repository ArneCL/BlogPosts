title: Java: Quick XML parsing using XPath and dom4j
date: 2012-03-17 10:30:13
tags: java,java-domj4,xml

If you download the dom4j jar, along with the jaxen jar, you can easily manipulate XML. I have versions 1.6 and 1.1 respectively. Add these to your Java build path in Eclipes.

Put an XML file, sample.xml in this case, in the same directory as the class you'll be using

		<?xml version="1.0" encoding="UTF-8"?>
		<hello thing="yeah">World</hello>

Now for the code. The first bit is loading the XML. Creating the SAXReader, loading the resource into that, which will return a Document which you will use to get your XML data.

		InputStream lIs= Main.class.getClassLoader().getResourceAsStream("sample.xml");
		SAXReader lSr = new SAXReader();
		try {
			Document lDoc = lSr.read(lIs);
			List<Node> lS = lDoc.selectNodes("//hello");
			String s = lDoc.valueOf("/hello/@thing");
		} catch (DocumentException e) {
			e.printStackTrace();
		}

After the Document is created, you can use the XPath notation to grab the tags, the single hello in this case. And the notation to grab an attribute. See an XPath reference here: http://www.w3schools.com/xpath/xpath_syntax.asp
