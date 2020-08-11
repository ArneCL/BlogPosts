title: Formatting/Beautify HTML and Javascript from the command line
tags: unix,javascript,html
date: Nov 9, 2015

First, install the js-beautify package from npm.

    sudo npm -g install js-beautify

Now make some dodgily formatted HTML with javascript

    echo '<html></body></body><script> var i = 0; var j = 1; </script></html>' > dodgy.html
    
``js-beautify`` takes ``-f -`` to find things from the command line, and ``--type html`` to say the javascript is embedded in some HTML. Finally we pipe to ``less`` for viewing.

    cat dodgy.html | js-beautify -f - --type html

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
