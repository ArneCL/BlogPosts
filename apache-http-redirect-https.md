title: Apache: Redirect HTTP traffic to HTTPS
tags: unix,apache,apache-mod_rewrite
date: Mar 26, 2014

If you want all the HTTP traffic to be rerouted through HTTPS, you need to specify a mod_rewrite rule:

    <VirtualHost *:80>
     ServerName  example.com
     RewriteEngine on
     ReWriteCond %{SERVER_PORT} !^443$
     RewriteRule ^/(.*) https://%{HTTP_HOST}/$1 [NC,R=301,L]
    </VirtualHost>

This is saying take all traffic going to port 80 that's not on port 443 (yeah...) and rewrite it to a https:// url, ignoring case (NC), sending a moved permanently error message (R=301).

Now specify the vhost entry for HTTPS:
    
    <VirtualHost *:443>
      ServerName  example.com
    
      SSLEngine on
      
      SSLCertificateFile your_cert.pem
      SSLCertificateKeyFile your_private.key
      
      ...
    </VirtualHost>

The above is a normal SSL vhost entry, specifying the certificate and private key for your HTTPS site.
