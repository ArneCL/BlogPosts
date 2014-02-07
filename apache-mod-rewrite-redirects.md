title: Apache 2: Redirecting to another site with mod_rewrite
tags: apache,unix,apache-mod_rewrite

If you place a file like this in your /etc/apache2/sites-available/somesite.conf

    ...
    ServerName www.example.org
    ServerAlias example.org
    ...
    ProxyPass / http://localhost:1234
    ...
    
Then when you hit http://www.example.org/ Apache will then rewrite your request to http://localhost:1234 on your server, yet the browser won't know the difference , it will only know it's talking to http://www.example.org

Should your server perform any redirects, let's say http://localhost:1234/initial redirects to http://localhost:1234/redirected, then the following will ensure that http://localhost:1234/redirected is converted into http://www.example.org/redirected

    ...
    ProxyPassReverse / http://localhost:1234/
    ...

To do the same with your cookie domain path use the following.

    ...
    ProxyPassReverseCookieDomain http://localhost:1234 http://example.org    
    ProxyPassReverseCookiePath http://localhost:1234 http://example.org   
    ...
    
You should see https://httpd.apache.org/docs/2.2/mod/mod_proxy.html for more details.
