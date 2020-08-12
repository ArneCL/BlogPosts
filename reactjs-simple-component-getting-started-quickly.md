title: ReactJS: Getting started with a component very quickly and simply
tags: reactjs
date: Apr 19, 2016

First let's install `babel` and `reactjs` using `bower`:

    bower install --save babel
    bower install --save react

Create an index file as such, in your HTML directory served from someplace:

    <script src="bower_components/react/react.js"></script>
    <script src="bower_components/react/react-dom.js"></script>
    <script src="bower_components/babel/browser.min.js"></script>
    <script type="text/babel" src="helloworld.js"></script>
    
    <div id="container"> </div>

This loads in the reactjs and babel stuff, a local file called `helloworld.js` in the babel format, which we'll look at next, and then defines a placeholder for a container.

Now the helloworld.js babel file is as so:

    var Hello = React.createClass({
      render: function() {
        return <div>Hello {this.props.name}</div>;
      }
    });
    
    ReactDOM.render(
      <Hello name="Jim" />,
      document.getElementById('container')
    );

It creates a react component called 'Hello', which returns some HTML in its `render` function, using a property passed to the component.

The next part renders the component, passing in "Jim" as the name property, and specifies the component in index.html to render to, 'container' in our case.
