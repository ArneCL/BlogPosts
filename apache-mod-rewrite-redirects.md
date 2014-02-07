title: Apache 2: Redirecting to another site with mod_rewrite
tags: apache,unix,apache-mod_rewrite

If you place a file like this in your /etc/apache2/sites-available/somesite.conf

    ...
    ServerName www.yoursite.com
    ServerAlias yoursite.com
    ...
    ProxyPass / http://localhost:1234
    ...
    
Then when you hit http://www.yoursite.com/ Apache will then rewrite your request to http://localhost:1234 on your server, yet the browser won't know the difference , it will only know it's talking to http://www.yoursite.com

Should your server perform any redirects, let's say http://localhost:1234/initial redirects to http://localhost:1234/redirected, then the following will ensure that http://localhost:1234/redirected it converted into http://www.yoursite.com/redirected

    ...
    ProxyPassReverse / http://localhost:1234/
    ...

To do the same with your cookie domain path use the following.

    ...
    ProxyPassReverseCookieDomain http://localhost:1234 http://yoursite.com    
    ProxyPassReverseCookiePath http://localhost:1234 http://yoursite.com    
    ...
    
You should see https://httpd.apache.org/docs/2.2/mod/mod_proxy.html for more details.
