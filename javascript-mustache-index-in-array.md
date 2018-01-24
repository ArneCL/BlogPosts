title: Mustache.js: Get the index in an array
tags: javascript,mustache

Let's fix Mustache.js looping through arrays but not finding the index.

Let's say we have the array `animals = ["dogs", "cats", "wild boars"]`.

We can map this into an array of value-index objects.

```
animals.map((e, i) => { return {e: e, i: i} })
```

Integrate that with mustache.js and you get

```
return Mustache.render(`
  <ul>
    {{#animals_indexed}}
      <li>{{i}} {{e}}</li>
    {{/animals_indexed}}
  </ul>`, 
  { animals_indexed: _ => animals.map((e,i)=>{ return {e:e,i:i} })
  }
)
```
