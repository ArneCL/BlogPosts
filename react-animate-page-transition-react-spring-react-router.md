title: React: Animating component transition with react-spring and react-router
tags: reactjs
date: Mar 24, 2019

We can animate component transitions with react-spring's transitions. We'll use its react hooks implementation.

This is an explanation of: https://codesandbox.io/embed/jp1wr1867w

Let's first define our components along with a helper function to give it a full height style and background colour:

We'll use react-router's `Link` to go to a new component.

```
var pageStyle = (colour) => ({ height: "100%", backgroundColor: colour })

function A() {
  return <Link to="/b"><div style={pageStyle("lightblue")}>A</div></Link>
}
function B() {
  return <Link to="/c"><div style={pageStyle("pink")}>B</div></Link>
}
function C() {
  return <Link to="/a"><div style={pageStyle("lightgreen")}>C</div></Link>
}
```

We're going to use react's `useContext` hook and use react-router's `__ReactContext`. This gives us access to the current browser location. We'll use this to tell react-spring when it needs to transitions. We'll use this location, and location.pathname as the key for react-spring's transition:

```
const { location } = useContext(__RouterContext)
const transitions = useTransition(location, location => location.pathname, {
  initial: { transform: 'translate3d(0, 0%,0)'},
  from:    { transform: 'translate3d(0, 80%,0)'},
  enter:   { transform: 'translate3d(0, 0%,0)'},
  leave:   { transform: 'translate3d(0, -90%,0)'}
})
```

Finally we'll map over this transitions array, passing the key and props to `animated.div` and having the `Switch` within that. The animated.div must have absolute positioning to be able to animate it around the page.

Here's the whole thing:

```
import React, { useContext } from 'react';
import { useTransition, animated } from 'react-spring'
import { Route, BrowserRouter, Link, Switch, __RouterContext } from 'react-router-dom';
...
function App() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
}

function Home() {
  const { location } = useContext(__RouterContext)
  const transitions = useTransition(location, location => location.pathname, {
    initial: { transform: 'translate3d(0, 0%,0)'},
    from: { transform: 'translate3d(0, 80%,0)'},
    enter: { transform: 'translate3d(0, 0%,0)'},
    leave: { transform: 'translate3d(0, -90%,0)'}
  })
  return (
    transitions.map(({ item, props, key}) => (
      <animated.div 
        style={{...props, position: "absolute", height: "100%", width: "100%"}} 
        key={key}>
        <Switch location={item}>
          <Route exact path="/" component={A} />
          <Route exact path="/a" component={A} />
          <Route exact path="/b" component={B} />
          <Route exact path="/c" component={C} />
        </Switch>
      </animated.div>
    ))
  )
}

var pageStyle = (colour) => ({ height: "100%", backgroundColor: colour })

function A() {
  return <Link to="/b"><div style={pageStyle("lightblue")}>A</div></Link>
}
function B() {
  return <Link to="/c"><div style={pageStyle("pink")}>B</div></Link>
}
function C() {
  return <Link to="/a"><div style={pageStyle("lightgreen")}>C</div></Link>
}
```
