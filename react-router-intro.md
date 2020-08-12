title: React: Using React-Router intro
tags: reactjs
date: Mar 23, 2019

React-router is a library that lets you do routing in React. Let's use it.

Firstly, everything in your app must be surrounded by a `BrowerRouter`.

And you make links to different pages using `<NavLink>`. Let's make four links:

```
<div>
  <NavLink to="/">Main Page</NavLink>
  <NavLink to="/hello">Say Hello</NavLink>
  <NavLink to="/about/pink">About</NavLink>
  <NavLink to="/about/lightblue">About Blue</NavLink>
</div>
```

Note the third and fourth have url parameters. We'll use these later.

Finally, we must switch between the pages, so we use `<Switch>`. Inside that we use `<Route>`. And we specify a `path` which relates to the `to` attribute we used in the `<NavLink>`s (we also say it's exactly that - no fuzzy matching). Hext we have a `component` attribute we specifies the React component to render:

```
<Switch>
  ...
  <Route exact path="/" component={Main} />
  ...
</Switch>
```

If we want to use url parameters, and we do in the `/about/pink` and `/about/lightblue` links, we specify those in the `path` attribute of the `<Route>`. And then they appear in `props.match.params` in the component:

```
<Switch>
   ...
   <Route exact path="/about/:colour" component={About} />
   ...
</Switch>

....

function About({ match: { params } }) {
  return (
    <div style={{ backgroundColor: params.colour}}>
      I am the about page
    </div>
  )
}

```

Finally, if we want to pass props to our components, we use `render` instead of `component`. In `render` we return a component and you can pass a prop to that:

```
<Switch>
   ...
   <Route exact path="/hello" render={() => 
     <Hello name="Jakub"></Hello>
   } />
   ...
</Switch>

```

Here's the full example:


```
import { Route, BrowserRouter, NavLink, Switch } from 'react-router-dom';
...

function Main() {
  return (
    <div>I am the main page</div>
  )
}

function About({ match: { params } }) {
  return (
    <div style={{ backgroundColor: params.colour}}>
      I am the about page
    </div>
  )
}

function Hello({ name }) {
  return (
    <div>
      Hello, {name}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <NavLink to="/">Main Page</NavLink>
          <NavLink to="/hello">Say Hello</NavLink>
          <NavLink to="/about/pink">About</NavLink>
          <NavLink to="/about/lightblue">About Blue</NavLink>
        </div>
        <hr />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/about/:colour" component={About} />
          <Route exact path="/hello" render={() => 
            <Hello name="Jakub"></Hello>
          } />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

```

