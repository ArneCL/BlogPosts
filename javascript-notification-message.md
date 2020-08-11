title: Javascript/HTML5: Showing a notification popup message with the Notification API
tags: javascript,html5,html5-notification
date: Mar 3, 2019

You can show a small notification popup with the Notification API.

You first do `Notification.requestPermission()` to ask for permission.

Once you've got it, you can make a new `Notification` object. These have various options but we're just showing some text.

You can see the source below and a live example here: https://repl.it/@newfivefour/notification-api?language=html&folderId=

```
<body>
  
  <button onclick="notify()">Notify me</button>

  <script>

    function notify() {

      if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
      } else {
        Notification.requestPermission()
        .then(function(result) {
          if (result === "granted") {
            new Notification("Hi there!");
          } else {
            console.log("permission was not granted.")
          }
        });
      }
        
    }

  </script>

</body>
```
