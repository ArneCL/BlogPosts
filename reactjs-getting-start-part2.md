title: ReactJS: Getting started part 2
tags: reactjs
date: Jan 3, 2019

We need to create a reactjs component. We do this in a `text/babel` script since we're using javascript ES6 features and JSX.

```
class Hello extends React.Component {
  render() {
    return (
      <div>Hello!</div>
    );
  }
}
```

We create a javascript class that extends React.Component and give it a `render` function that returns some JSX. In this case we're returning a simple div.

Once we've created that we call `ReactDOM.render` with the HTML, in this case our new `Hello` tag, and as a second paramter we have the root div in the HTML body:

```
ReactDOM.render(
  <Hello />,
  document.getElementById('root')
);  
```

Here's all the code:

```
<html>
  <head>
    <script src="https://unpkg.com/react@16.3.1/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16.3.1/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
    <script src="https://unpkg.com/prop-types@15.6.1/prop-types.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script type="text/babel">

    class Hello extends React.Component {
      render() {
        return (
          <div>Hello!</div>
        );
      }
    }

    ReactDOM.render(
      <Hello />,
      document.getElementById('root')
    );  
  </script>
</html>
```
