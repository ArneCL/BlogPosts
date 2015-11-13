title: Usage of element.updateStyles()
tags: polymer,polymer-styles

The shim used for CSS variables is lightweight. 

This means you have to use ```element.updateStyles()``` in places where you'd like it to be automatic.

We've seen we need to use it if we [dynamically update a CSS variable](http://blog.denevell.org/polymer-dynamically-change-css-style.html) using element.customStyle.

Additionally, in a ```custom-style``` in index.html for example, if you have a style that changes a CSS variable based on a class selection:

    an-ele {
        --an-ele-name-bgcolor: green;
    }
    an-ele.warning {
        --an-ele-name-bgcolor: warning;
    }

Then, without ```updateStyles()```, nothing will happen if add or remove the 'warning' class from 'an-ele'. If you want to want to see the change you need to call element.updateStyles().

However, if instead you define two CSS variables in your custom element, and change the class at runtime, then it will work:

Within your custom element's style tag:

    :host {     
        background-color: var(--an-ele-name-bgcolor, white);
    }
    :host.warning { 
        background-color: var(--an-ele-name-bgcolor-warning, white);
    }

Within your index.html ```custom-styles`` style tag:

    an-ele {
        --an-ele-name-bgcolor-warning: red;
        --an-ele-name-bgcolor: purple;
    }


Then changing the 'warning' class at runtime will work without a call to updateStyles(), since the css variables shim no longer needs to change a CSS variable at runtime.
