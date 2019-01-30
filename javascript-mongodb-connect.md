title: Javascript: Connect to mongodb
tags: javascript, mongo

I'm using 3.1.10 of mongo. And the connection dance has changed a bit.

```
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, client) {
  client.db("inventory").collection("inventory", function(err, collection) {
    collection.insertOne(
      { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
    )
  });
})
```

You make the connection as usual, but don't mention the database in the url.

Then you connect with the connection url. And that gives you a client object.

Then you use that client object to open the database. And use that to open the collection.

Then you use a callback and issue your insert commands or whatever in that.
