title: NodeJS: Write javascript to JSON file
tags: nodejs,json

If you want to write your javascript object to a json file, it's easy enough:

```
fs.writeFileSync('thefilename.json', JSON.stringify(your_object))
```

This will synchronously write your file, too, unlike the other variant which calls a callback when it's finished.
