title: Let's Encrypt tutorial: create a simple certificate for Apache2
tags: https,letsencrypt

Let's create a simple certificate for Apache2. 

We won't do automatic renewal, meaning in three months time we'll have to deal with renewal. But we really **should** do autorenewal, but we're just testing things at the moment.

First login to your server. This is the server where your site on the internet, www.blarblaberklaejr.com, or whatever, is based. 

Then do this as root:

    mkdir -p /opt/letsencrypt
    cd /opt/letsencrypt
    git clone https://github.com/letsencrypt/letsencrypt
    ./letsencrypt-auto certonly --manual

This creates the directory where we clone the latest letsencrypt. Then we start the manual process to create certificates.

A terminal application will start asking you for your email for correspondence (although you'll not need to check your email to do anything of this), and the domains for which you want the certificate.

Then it'll break out of that and ask you to create a file on your publically available site for it to check.

Once that check is finished, it'll output the certificates to ``/etc/letsencrypt/live/yourdomain.com``.

Now your existing ``/etc/apache2/sites-available/your-file-name.conf`` should look something like

    <VirtualHost *:443>
      SSLEngine On
      SSLCertificateFile /etc/letsencrypt/live/yourdomain.com/fullchain.pem
      SSLCertificateKeyFile /etc/letsencrypt/live/yourdomain.com/privkey.pem
    
      ...
    </VirtualHost>

Restart apache. Rejoice.
