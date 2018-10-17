title: Reactjs: Quick start tutorial for react-router with browser history
tags: reactjs,javascript
date: Apr 21, 2016

Let's first initialise our directory and install the modules. I'm using nodejs v5.10.1.  

    mkdir our_dir && cd our_dir
    mkdir src
    npm init -y
    npm install react react-dom react-router --save
    npm install webpack babel-core babel-loader babel-preset-es2015 babel-preset-react --save-dev

Now let's use a `webpack.config.js` that uses an entry point of src/router.js and outputs to bundle.js using the babel loader with es2015 and react presets:

    module.exports = {
            entry: "./src/router.js",
            output: {
                    path: __dirname,
                    filename: "bundle.js"
            },
            module: {
                    loaders: [
                            { loader: 'babel', query: { presets: ['es2015', 'react'] }, exclude: /node_modules|bower_components/ }
                    ]
            }
    };

The first files in our `src` directory will simple components that output some simple text. pageone.js:

    import React from 'react'
    import { render } from 'react-dom'
    
    const Pageone = React.createClass({
      render: function() {
        return <div>This is page one</div>;
      }
    });
    
    export default Pageone;

pagetwo.js:

    import React from 'react'
    import { render } from 'react-dom'
    
    const Pagetwo = React.createClass({
      render: function() {
        return <div>This is page two</div>;
      }
    });
    
    export default Pagetwo;

The next component will be the main layout. We'll call it `mainlayout.js`. It uses the `Link` component from react-router to create links. The `{this.props.children}` part will be replaced with the components to which we will navigate.

    import React from 'react'
    import { render } from 'react-dom'
    import { Link } from 'react-router'
    
    const MainLayout = React.createClass({
      render() {
        return (
          <div>
            <Link to="/pageone">Page one</Link> | <Link to="/pagetwo">Page two</Link>
            {this.props.children}
          </div>
        )
      }
    })
    
    export default MainLayout;

The next file `router.js`, which we refer to in our webpack.config.js file, is where we import all our components and define the route:

    import React from 'react'
    import { render } from 'react-dom'
    import { Router, Route, IndexRoute, hashHistory } from 'react-router'
    
    import MainLayout from './mainlayout';
    import Pageone from './pageone';
    import Pagetwo from './pagetwo';
    
    render((
      <Router history={hashHistory}>
        <Route path="/" component={MainLayout}>
          <Route path="pageone" component={Pageone} />
          <Route path="pagetwo" component={Pagetwo} />
        </Route>
      </Router>
    ), document.getElementById('container'));

We use the `Router` tag to start the routes, specifying `{hashHistory}`, which we imported, to tell react-router how to deal with history.

Within such, we have a `Route` which has a `path` attribute, which is just the root, and a `component` attribute, which is the MainLayout component we defined earlier.

Without that, we define two routes, named `pageone` and `pagetwo`, which relate to the link names in MainLayout. And we set the components to the ones we defined above.

And we render all that in to a `container` id which we will create in our `index.html` file.

Now go back into the main directory, and create this simple `index.html` file, with the `container` id relating to the above router.js file, and the `bundle.js` relating to the file webpack will shortly create for us.

    <div id="container"> </div>
    <script src="bundle.js"></script>

Finally, webpack to create the bundle.js file:

    ./node_modules/webpack/bin/webpack.js

which should output something like:

    Hash: 4aeabfc523370b2c0c2c
    Version: webpack 1.13.0
    Time: 1246ms
        Asset    Size  Chunks             Chunk Names
    bundle.js  858 kB       0  [emitted]  main
        + 228 hidden modules

And now if you visit your index.html file on your web server, you should see the router in action, complete with browser history.

The first page will just be what we defined in our MainLayout. If you want a default component there, use `<IndexRoute component={Index} />` within your `Route` and create the `Index` component.
