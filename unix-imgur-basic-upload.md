title: Upload to an image to imgur from the command line with curl
tags: unix,imgur,curl

First, go to https://api.imgur.com/oauth2/addclient and register as a client. Create a new client and you'll eventually get a Client ID and a Client secret.

Now take the client ID, and use this curl command:

```
curl --request POST --url https://api.imgur.com/3/image --header 'authorization: Client-ID YOUR_CLIENTID_HERE'   --header 'content-type: multipart/form-data;' -F "image=@/LOCATION/OF/THE/IMAGE.png"
```

You should get some JSON back like this:

```
{"data":{"id":"SOME_ID","title":null,"description":null,"datetime":1511088894,"type":"image\/png","animated":false,"width":256,"height":256,"size":7541,"views":0,"bandwidth":0,"vote":null,"favorite":false,"nsfw":null,"section":null,"account_url":null,"account_id":0,"is_ad":false,"in_most_viral":false,"has_sound":false,"tags":[],"ad_type":0,"ad_url":"","in_gallery":false,"deletehash":"SOME_DELETE_HASH","name":"","link":"https:\/\/i.imgur.com\/THE_URL.png"},"success":true,"status":200}
```
