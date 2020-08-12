title: ReactJS: Component state
tags: reactjs
date: Jan 3, 2019

ReactJS component's state is set in the constructor, by setting the `state` property.

You call the super constructor too. The constructor takes in the props passed to the component.

You refer to this by `this.state.PROPERTY_NAME`. 

This is better than than using the `this.props` directly because you can later use `setState` to update the component and dependent components using this state.

We'll look at `setState` next.

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
      constructor(props) {
        super(props);
        this.state = {
          name: props.name + "!",
        };
      }    
      render() {
        return (
          <div style={{display: "flex", flexDirection: "row"}}>
            <div>Hello {this.state.name}!</div>
            <button>on acid</button>
          </div>
        );
      }
    }

    ReactDOM.render(
      <Hello name="Davey dave dave" />,
      document.getElementById('root')
    );  
  </script>
