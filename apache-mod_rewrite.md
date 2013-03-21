title: Apache 2: Using mod_write
tags: unix,apache,apache-mod_rewrite

First enable mod_rewrite with

		a2enmod rewrite

Then add this to your available sites config

		RewriteEngine On
		RewriteRule .*index\.php.* /index.html [R]

That will rewrite all the files with index.php in them to index.html
