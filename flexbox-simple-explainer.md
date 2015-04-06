title: Android: Flexbox simple explainer
tags: css, flexbox

Although flexbox is a rather lot to comprehend, it can be broken down into a bunch of questions asked to the layout items.

This should become clearing in the example afterward.

Conversation
============

To the container:

* "What axis do you want to place your items down?" (flex-direction)
* "While placing the items down that axis, how would you like to align the items?" (justify-content)
* "How would you like those items aligned down the other axis?" (align-items)
* "If there's not enough space in the container for the items, should I wrap them?" (flex-wrap)

To the individual items:

* "Do you want to differ to the way you're being aligned, regarding the align-items propery?" (align-self)
* "What's the minmum of your size down the flex-direction size (in px or percentage)?" (flex-basis)
* "While layout out down the flex-direction, should we grow your size to fill the space?" (flex-grow)
* "While layout out down the flex-direction, should we shrink your size" (flex-shrink)

Example
=======

Let's say you've got a div that takes up the whole screen (height and width at 100%). And you want a collection of divs within to be placed at the bottom of the screen in the center.

The questions would be:

To the container: 

"I want the items places down the 'row', or should I say X, axis" (flex-direction: row), "I want them aligned in the center" (justify-content: center), "I want those items aligned to the bottom of the Y axis" (align-items: flex-end), "And if there's not enough room, wrap the items" (flex-wrap: wrap).

To the items: 

You'd leave these blank, in this case.

If you wanted to the last item to be aligned, not to the bottom, but to the middle, you could set align-self: center on that item. You could also use 'flex-basis' to give that item at least 50% of the space down the flex-direction axis

If you played with any of the flex-grow or flex-shrink properties, it'd no longer be aligned down the middle of the flex-direction, since it'd start taking up all the space available in the case of flex-grow: 1, with flex-grow: 2 meaning take up twice as much room as the item with flex-grow: 1.

