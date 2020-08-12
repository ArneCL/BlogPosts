title: Using Webpack with babel and reactjs
tags: reactjs, javascript-webpack
date: Apr 20, 2016

If you're using webpack--and you probably are--with react, you can set webpack to process all the javascript files with babel, converting all the es2015 and reactjs stuff ready for the web.

The following converts everything, including the es2015 modules, from src/app.js to bundle.js, using the babel loader, with es2015 and react presets.

    module.exports = {
            entry: "./src/app.js",
            output: {
                    path: __dirname,
                    filename: "bundle.js"
            },
            module: {
                    loaders: [
                            { loader: 'babel', query: { presets: ['es2015', 'react'] } }
                    ]
            }
    };

The above should be your `webpack.config.js` file

The npm modules you need are:

    npm install webpack
    npm install babel-loader babel-core babel-preset-es2015 --save-dev
