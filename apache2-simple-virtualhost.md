title: Apache 2: A simple virtual host file
tags: apache2

I'm on 2.4.18.

First create a file in `/etc/apache2/sites-available/` Call it `whatever.conf`.

There's the `<VirtualHost>` tag that contains the instructions. We listen for all host names, `*`, on port 80.

We specify the `ServerAdmin` email address, the `ServerName` that specifies what hostname to listen for, and an alias if needed.

    <VirtualHost *:80>
      ServerAdmin null@localhost.com
      ServerName  something.example.com
      ServerAlias another.example.com
      ...
    </VirtualHost>

We then specify the file to server as the default file to load, `index.html` usually. And the location of the root directory.

      DirectoryIndex index.html
      DocumentRoot /dir/public

Then specify the logging level and the location of the error log and the `CustomLog` which logs requests to the server.

      LogLevel warn
      ErrorLog  /dir/log/error.log
      CustomLog /dir/log/access.log

In full:

    <VirtualHost *:80>
      ServerAdmin noone@example.com
      ServerName  something.example.com
      ServerAlias another.example.com
    
      # Index file and Document Root (where the public files are located)
      DirectoryIndex index.html
      DocumentRoot /dir/public
    
      # Log file locations
      LogLevel warn
      ErrorLog  /dir/log/error.log
      CustomLog /dir/log/access.log
    </VirtualHost>

Finally, enable this site via `a2ensite whatever`. Then `service apache2 reload`.
