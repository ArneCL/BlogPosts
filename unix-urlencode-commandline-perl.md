title: Unix: Urlencode and urldecode from the command line with Perl
tags: unix,urlencode

If you want to urlencode or urldecode from the command line--that is escape or unescape URL content--the simplest solution is to use Perl:

    perl -MURI::Escape -e 'print uri_escape("&");'

Use the same command, but with `url_unescape` to reverse the process.
