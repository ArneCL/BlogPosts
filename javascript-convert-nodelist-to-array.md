title: Javascript: Convert a NodeList to an Array
tags: javascript

Unless you can use ES6--in which you can just do Array.from(nodelist).forEach()--you have to do this:

    var things = document.querySelectorAll(".things");
    Array.prototype.slice.call(things, 0).forEach(...

Or, if you're a fan of line noise:

    Array.prototype.slice.call(document.querySelectorAll(".things"), 0).forEach(...
