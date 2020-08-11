title: ReactJs: Precompiling JSX babel files
tags: javascript,reactjs,javascript-babeljs,reactjs-babeljs
date:  Apr 19, 2016

When you use JSX/Babel in your reactjs app, the import for babel is rather large.

You can, instead, precompile the files from babeljs to javascript using the babel-cli application.

First install babel-cli and its presets using npm:

    npm init -y
    npm install --save-dev babel-cli
    npm install --save-dev babel-preset-es2015 babel-preset-react

Then ensure your have both `src` and `dist` directories, and put the JSX/Babel files in the src directory.

Now we can run the babel cli program to automatically convert babel files to javascript file in the dist directory:

    nodejs node_modules/babel-cli/bin/babel.js --presets es2015,react --watch src --out-dir dist

Now you can remove the script import for babel, and change the paths to the components to the dist/ directory:

Your index.html:

    <script src="bower_components/react/react.min.js"></script>
    <script src="bower_components/react/react-dom.min.js"></script>
    
    <div id="container"> </div>
    
    <script src="dist/helloworld.js"></script>

And now the helloworld.js (in the src directory, not in the dist directory which is generated):

    var Hello = React.createClass({
      render: function() {
        return <div>Hello {this.props.name}</div>;
      }
    });
    
    ReactDOM.render(
      <Hello name="Jim" />,
      document.getElementById('container')
    );

