title: HTML, CSS: Make a div float in the middle of page
tags: css, html

First make the `position` of the div `fixed`. We'll place it at the bottom of our screen by setting the `bottom` to `5px`.

We make it so the div starts from the middle of the screen by setting the `left` property to `50%`.

But this won't make it exactly in the middle of the screen, of course, since this mean it starts from the middle of the screen, not that its centre point is in the middle of the screen.

To properly centre the div use the `transform` property to move the div half its width to the left.

```
  <div
    style="position: fixed; bottom: 5px; left: 50%; transform: translateX(-50%);">
    I am centered. Rejoice.
  </div>
```
