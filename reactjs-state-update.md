title: ReactJS: Updating state
tags: reactjs
date: Jan 4, 2019

We have state in our component. And we can call `this.setState` from a click listener to update that state. When we update the state the component with effecticently (using virutaldom) redraw itself and any sub components.

`this.setState` takes a object as argument and its values relate to the property names in your state. It updates them. 

We can call this from a `onClick` attribute on a HTML tag. The `onClick`'s value is within curly bracked and the javascript is within: `onclick={() => console.log("i am some javascript")}`

We will change our `style` in our `div` object so it changes based on a `clicked` variable in our state.

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
          name: props.name,
          clicked: false,
        };
      }
      render() {
        return (
          <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{color: (this.state.clicked) ? "lightgreen" : "blue" }}>Hello {this.state.name}!</div>
            <button onClick={() => this.setState({clicked: true})}>on acid</button>
          </div>
        );
      }
    }

    ReactDOM.render(
      <div>
        <Hello name="Davey dave dave" />
        <Hello name="Chris" />
        <Hello name="Ahmed" />
        <Hello name="Peter" />
      </div>,
      document.getElementById('root')
    );
  </script>
</html>
```
