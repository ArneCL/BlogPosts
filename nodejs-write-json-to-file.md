title: NodeJS: Write javascript to JSON file
tags: nodejs,javascript
date: Oct 10, 2017

If you want to write your javascript object to a json file, it's easy enough:

```
fs.writeFileSync('thefilename.json', JSON.stringify(your_object))
```

This will synchronously write your file, too, unlike the other variant which calls a callback when it's finished.
