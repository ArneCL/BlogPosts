title: CSS: Create a simple dropdown without javascript
tags: css
date: May 29, 2016

Here's the absolute basics of creating a dropdown with CSS without javascript.

First create a container box, and give it a class.

    <span class="dropdown_container">
    </span>

Then within that place the actual content to show pre-dropdown.

    <span class="dropdown_container">
      <span>Some text</span>
    </span>

Now the content--with a class--to show when the dropdown is activiated:

    <span class="dropdown_container">
      <span>Some text</span>
      <span class="dropdown">I am the dropdown</span>
    </span>

Now with the css, hide the `.dropdown` class by default:

    .dropdown { 
      display: none;
    }

But when we hover over the `.dropdown_container` let's set the `display` property of `.dropdown` to `block`.

    .dropdown_container:hover .dropdown { 
      display: block;
    }

And voila. The final code is:

    .dropdown {
      display: none;
    }
    .dropdown_container:hover .dropdown {
      display: block;
    }

    ...
    
    <span class="dropdown_container">
      <span>Some text</span>
      <span class="dropdown">I am the dropdown</span>
    </span>
