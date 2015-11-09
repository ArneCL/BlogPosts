title: Formatting/Beautify HTML and Javascript from the command line
tags: unix,javascript,html,beautify,npm

First, install some npm packages from the command line that'll format both html and js for you.

    sudo npm -g install js-beautify
    sudo npm -g install npm

Now make some dodgily formatted HTML with javascript

    echo '<html></body></body><script> var i = 0; var j = 1; </script></html>' > dodgy.html
    
We can use the ``html`` command as is, and the ``js-beautify`` takes ``-f -`` to find things from the command line, and ``--type html`` to say the javascript is embedded in some HTML. Finally we pipe to ``less`` for viewing.

    cat dodgy.html | html | js-beautify -f - --type html

The output is:

    <html>
    </body>
    </body>
    <script>
        var i = 0;
        var j = 1;
    </script>
    
    </html>

You can add ``-o dodgy.html`` to replace the original text in dodgy.html.
