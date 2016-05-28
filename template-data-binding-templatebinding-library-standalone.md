title: Use data binding in the HTML Template element standalone without Polymer
tags: html-template,html-data-binding,polymer

If you're using the new `template` tag to define inert content in your HTML, you may want to use data binding also.

This comes as default with Polymer, but they created a library--now only used in a previous version of Polymer--that allows you to data bind standalone/independently of Polymer.

Let's first user bower to get that `bower install -s Polymer/TemplateBinding`. This puts a couple of repositories in your `bower_components` library.

Now you can use the examples [here](https://github.com/Polymer/TemplateBinding/blob/master/examples/how_to/bind_to_text.html) as below:

    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="bower_components/TemplateBinding/load.js"></script>
        <title>Template binding</title>
        <style>
        </style>
      </head>
      <body>
        <ul>
        <template id="text" repeat="{{ text }}">
          <li>Text is bound here: {{ value }}</li>
        </template>
      </body>
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          var t = document.getElementById('text');
          t.model = {
            text: [
              { value: 'Fee' },
              { value: 'Fi' },
              { value: 'Fo' },
              { value: 'Fum' }
            ]
          };
      </script>
    </html>
