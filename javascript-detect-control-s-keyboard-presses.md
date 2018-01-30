title: Javascript: Detect keyboard presses, with control.
tags: javascript

If you want to detect when control is pressed, or similar, then:

```
window.addEventListener("keydown", event => {
    // we look for control s, or the code 19 since safari uses that...
    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
    alert("Ctrl-S pressed");
    // don't do what it normally does
    event.preventDefault();
    // don't continune propagating the event
    return false;
})
```
