title: ReactJS: Getting started without npm etc
tags: reactjs,javascript

If you want to use ReactJS without setting up a build change, you can directory import the javascript files from a CDN. Obviously when you go live you'll want to change this.

```javascript
<html>
  <head>
    <script src="https://unpkg.com/react@16.3.1/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16.3.1/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
    <script src="https://unpkg.com/prop-types@15.6.1/prop-types.js"></script>
  </head>
  <body>
    Hello
  </body>
</html>
```