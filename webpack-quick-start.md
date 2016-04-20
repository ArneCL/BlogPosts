title: Webpack: Quick introduction
tags: webpack, reactjs

The wonders, or horrors, of the reactjs toolchain generally includes webpack.

First off, on ubuntu, ensure you're on the latest node:

    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash
    sudo apt-get install -y nodejs

Afer you've initialised your package.json with npm init -y or similar, install webpack and its css and style loader.

    npm install webpack
    npm install css-loader style-loader

Now let's have an `entry.js` file that will be included in our 'pack'

    require("./style.css");
    document.write(require("./content.js"));

The first line includes a css file, and the second writes out content that is included in the module export of the content.js file.

Here's the style.css file:

    body {
        background: yellow;
    }

And here's the content.js file

    module.exports = "It works from content.js.";

Now to actually bundle this up, you need to call `webpack` as thus:

    node_modules/webpack/bin/webpack.js ./entry.js bundle.js --module-bind 'css=style!css'

This defines all files with `.css` use the css-loader module we installed above, and bundles everything in entry.js into bundle.js

But you probably want all the command line stuff in a config file, the webpack.config.js file as default:

    module.exports = {
            entry: "./entry.js",
            output: {
                    path: __dirname,
                    filename: "bundle.js"
            },
            module: {
                    loaders: [
                            { test: /\.css$/, loader: "style!css" }
                    ]
            }
    };
