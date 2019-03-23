title: React: react-spring transitions tutorial
tags: reactjs.javascript

React-spring transitions let your transition items when they're added or removed from a list. Let's use them with react hooks.

Let's create an array of items (each has a key). An index variable which will be the successive keys. And two functions that will add or remove something from that list (we're using array slice to make new versions of the array so react see the change):

```
const [items, setList] = useState([
  {key: 1, item: "one"},
  {key: 2, item: "two"},
  {key: 3, item: "three"}
])
const [index, setIndex] = useState(4)
const addToList = () => {
  setIndex(index+1)
  var nItems = items.slice()
  nItems.push({key: index, item: "new"})
  setList(nItems) 
}
const removeFromList = () => {
  var nItems = items.slice()
  nItems.pop()
  setList(nItems) 
}
```

Next we pass these `items` to `useTransition`. And we'll specify where the keys are for this list of items (this is very importtant). And finally we'll specify the react-spring transitions state.

```
const transitions = useTransition(items, item => item.key, {
  initial: { transform: 'translate3d(0%, 0%,0)' },
  from: {  transform: 'translate3d(0%,-100%,0)' },
  enter: { transform: 'translate3d(0%, 0%,0)' },
  leave: { transform: 'translate3d(100%,0%,0)' }
})
```

`initial` is the initial position of the items`. `from` is where they come from when they're added (100% above the final position in this case). `enter` is its resting place. And `leave` is where it will go when it's removed from the list (in our case we'll animate it off the screen)

Finally we render it like this:

```
<div>
  <button onClick={addToList}>add</button>
  <button onClick={removeFromList}>remove</button>
  {transitions.map(({ item, props, key }) =>
    <animated.div 
      key={key} 
      style={props}>
      <div>{item.item}</div>
    </animated.div>
  )}
</div>
```

We then map over `transitions` and show a `animated.div`, which takes in the app import `props` as style props and the key we defined in our list. We have our two buttons which add and remove items.

All the code looks like this:

```
import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring'
...
function AThing2() {
  const [items, setList] = useState([
    {key: 1, item: "one"},
    {key: 2, item: "two"},
    {key: 3, item: "three"}
  ])
  const [index, setIndex] = useState(4)
  const addToList = () => {
    setIndex(index+1)
    var nItems = items.slice()
    nItems.push({key: index, item: "new"})
    setList(nItems) 
  }
  const removeFromList = () => {
    var nItems = items.slice()
    nItems.pop()
    setList(nItems) 
  }
  const transitions = useTransition(items, item => item.key, {
    initial: { transform: 'translate3d(0%, 0%,0)' },
    from: {    transform: 'translate3d(0%,-100%,0)' },
    enter: {   transform: 'translate3d(0%, 0%,0)' },
    leave: {   transform: 'translate3d(100%,0%,0)' }
  })
  return (
    <div>
      <button onClick={addToList}>add</button>
      <button onClick={removeFromList}>remove</button>
      {transitions.map(({ item, props, key }) =>
        <animated.div 
          key={key} 
          style={props}>
          <div>{item.item}</div>
        </animated.div>
      )}
    </div>
  )
}
```

![Demo](https://i.imgur.com/B2OIsm9.gif "Sup")
