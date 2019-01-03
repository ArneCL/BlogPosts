title: ReactJS: Css and JSX
tags: reactjs

ReactJS uses JSX and that works different with CSS. Normally you can use a `style` string. 

But with JSX you use two curly-bracketed javascript property list then the css name and value are the properties. Dashes are replaced by camal case:

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
          <div style={{display: "flex", flexDirection: "row"}}>
            <div>Hello {this.props.name}!</div>
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
```
