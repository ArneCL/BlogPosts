Title: Unix: curl
{{wl-tags: unix-curl|unix}}{{wl-publish: 2013-02-25 12:00:58 -0500 | Denevell }}

To use curl to simulate a GET request with custom headers, you use this. 

Note a normal header would be "One: Thing". But if you're passing no data, it's "One;"

     curl -k --header "One;" --header "Two;" --header "Three;" https://your.url
