title: Javascript: Read the content of a local file
tags: javascript

Create an `input` node first and set its `accept` attribute to filter the available files and its `type` to `file`.

Then set an `onchange` listener. This will be called when the user has selected a file. 

This creates a `FileReader` object.  Sets an `onload`callback that will be called when the file is loaded.

Then you call `reader.readAsText` if your file is a text file. Its argument is the file object in the `input` element.

Altogther:

```
var a = document.createElement("input"); 
a.accept=".json";
a.type="file"; 
a.onchange= function(event) {
  var reader = new FileReader();
  reader.onload = function(e){
    console.log(reader.result)
  };
  reader.readAsText(event.target.files[0]);
}
document.body.appendChild(a)
a.click()
```

You may want to remove the `input` element after `onchange` has been called.
