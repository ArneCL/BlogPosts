title: Multiple pages and browser history navigation using plain js
tags: javascript,html

You often want different pages in your web app with browser navigation.

Let's define the HTML. Each page will be a `div` with the `page` class and an `id` attribute that ends with `_page`. We'll describe the function event listeners later.

```
<div id="main_page" class="page">
    <p>
        Home page content
    </p>
    <div onclick="gotoPage('pagetwo')">
        Next page
    </div>
</div>
<div id="pagetwo_page" class="page">
    <div onclick="gotoPage(-1)">
        Previous page
    </div>
    <p>
        Page two content
    </p>
</div>
```

The `gotoPage` function will:

0. Go to a new page using the location hash, i.e. `gotoPage("newpage")` will go to "localhost/#newpage"
0. Go to previous page when `-1` is passed
0. If this is the first load of the page, `gotoPage(-1)` will go to `main_page` instead.
0. If no argument is passed, we refresh the current page
0. Allow us to go to previous page with the browser back button i.e. if we're on "localhost/#newpage" then the back button will take us to "localhost/"

```
function gotoPage(hash) { 
    var go = (hash) => {
        // Check if this conflicts with something in your app
        history.state = "from_webapp"
        location.hash = hash
    }
    // if come from another page in our webapp, let's go back to previous page
    if(hash == -1 && history.state == "from_webapp") history.back()
    // if we haven't used gotoPage() before (i.e. this is a direct link therefore no "from_webapp")
    // then let's go to default page on go(-1) 
    else if(hash == -1 ) go("") 
    else if(hash) go(hash)
    else window.newfivefour.onpopstate()
}
```

We'll see what `window.newfivefour.onpopstate()` refers to in a moment.

We'll now setup our logic, `setupPages()`. The first thing we'll do it hide all `div`s with the `.page` class. Then on each time `go()` changes the location hash we'll call a function.

Each run of this function will then hide all the element again and show a div based on the page name. Going to `go("messages")` will unhide `<div id="messages_page">`. If the location hash is blank or "#" we'll show the `<div id="main_page>`.

`setupPage` will take an object whose properties relate to the main of a page id, i.e. `<div id="pagetwo">` will relate to `{ "#pagetwo" : ... }`, and the values will be functions. 

So each time the function inside `setupPages` run it will check this object against the page we're visiting and then run the functions therein, so you can define javascript functions to run when a page is loaded.

Here's the whole thing

```
<html>
  <body>
    <div id="main_page" class="page">
      <p>
        Home page content
      </p>
      <div onclick="gotoPage('pagetwo')">
        Next page
      </div>
    </div>
    <div id="pagetwo_page" class="page">
      <div onclick="gotoPage(-1)">
        Previous page
      </div>
      <p>
        Page two content
      </p>
    </div>
  </body>
  <script>
    setupPages({
      "default": () => console.log("main page"),
      "#pagetwo": () => console.log("page two")
    })


    function gotoPage(hash) { 
      var go = (hash) => {
        // Check if this conflicts with something in your app
        history.state = "from_webapp"
        location.hash = hash
      }
      // if we've not directly linked to the page, let's go back to previous page
      if(hash == -1 && history.state == "from_webapp") history.back()
      // if we haven't used gotoPage() before (i.e. this is a direct link therefore no "from_webapp")
      // then let's go to default page on go(-1) 
      else if(hash == -1 ) go("") 
      else if(hash) go(hash)
      else window.newfivefour.onpopstate()
    }
    function setupPages(onLoadPageHash) {
      if(!window.newfivefour) window.newfivefour = {}
      var hideAllPages = () => {
        var pages = document.querySelectorAll(".page");
        for(var i = 0; i < pages.length; i++) pages[i].style.display="none";
      }
      hideAllPages()
      window.newfivefour.onpopstate = () => {
        hideAllPages()
        var hash = location.hash;
        if(hash == "" || hash == "#") {
          document.querySelector("#main_page").style.display = "block"
          if(onLoadPageHash && onLoadPageHash["default"]) onLoadPageHash["default"]()
        } else {
          if(onLoadPageHash && onLoadPageHash[hash]) onLoadPageHash[hash]()
          var page = document.querySelector(hash + "_page")
          if(page) {
            page.style.display = "block"
          }
        }
      }
      window.addEventListener("popstate", window.newfivefour.onpopstate)
      gotoPage() // Go to the default page
    }
  </script>
</html>
```
