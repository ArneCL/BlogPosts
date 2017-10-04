title: Simple SQLite3 and NodeJS interactions
tags: nodejs, sqlite

Firstly install sqlite3, `npm -g install sqlite3` then:

```
const sqlite3 = require('sqlite3');
var yourdb = new sqlite3.Database('yourdb.sqlite3');
yourdb.all("select * from yourtable", [], function(e, row) { console.log(row) })
```
