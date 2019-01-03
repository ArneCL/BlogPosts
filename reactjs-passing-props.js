title: ReactJS: Sending props to elements
tags: reactjs,javascript

You can send the value of attributes to reactjs components. 

You use a normal HTML attribute and in your component you access it by `{this.props.your_attribute_name}`.

For example:

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
          <div>Hello {this.props.name}!</div>
        );
      }
    }

    ReactDOM.render(
      <Hello name="Davey dave dave" />,
      document.getElementById('root')
    );  
  </script>
</html>
```

