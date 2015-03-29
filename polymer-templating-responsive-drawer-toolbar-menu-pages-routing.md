Title: Polymer: Tutorial for responsive drawer, toolbar, menu, pages, routing and templating
Tags: polymer

This is for 0.5.5. It'll likely change for 0.8 (yet to be released). This is  re-hash of the Polymer polycast videos on youtube by Rob Dodson for reference.

First create the below basic bower file.

    {
      "name": "your-app",
      "version": "0.0.1",
      "description": "",
      "private": true,
      "dependencies": {
      }
    }
    
Now the dependencies, which'll be added the the above file with the --save flag.

    bower install --save Polymer/core-elements
    bower install --save Polymore/more-routing

Let's assume this is your header and footer of the page, setting the app to not scale or zoom, and imports the webcomponents, more-routing and core-elements library (which will import polymer accordingly). (Note: Importing the whole core-elements is inefficient since it loads everything, but for testing it's fine)

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=0">
            <meta name="apple-mobile-web-app-capable" content="yes">
            <meta name="mobile-web-app-capable" content="yes">
            <script src="bower_components/webcomponentsjs/webcomponents.min.js"> </script>
            <link rel="import" href="bower_components/more-routing/more-routing.html"> 
            <link rel="import" href="bower_components/core-elements/core-elements.html"> 
            <style>
                a {
                    color: black;
                    text-decoration: none;
                }
            </style>
        </head>
        
and then the footer

    </html>
    
Now the body of the document looks like this. Explained below.

    <body unresolved fullbleed fit layout vertical>
      <template is="auto-binding" id="template">
        <core-drawer-panel layout vertical>
          <core-header-panel drawer>
            <core-toolbar> 
              <span>Menu</span>
            </core-toolbar>
            <div> content </div>
          </core-header-panel>
          <core-header-panel  main>
            <core-toolbar>
              <core-icon-button icon="menu" core-drawer-toggle></core-icon-button>
              <div>{{title}}</div>
              <span flex></span>
              <core-icon-button icon="search"></core-icon-button>
            </core-toolbar>
            <div> main content </div>
          </core-header-panel>
        </core-drawer-panel>
      </template>
    </body>
    <script>
      window.addEventListener("polymer-ready", function(e) {
        var tmpl = document.querySelector("#template");
        tmpl.title = "Some title";
        tmpl.addEventListener('template-bound', function(e) {
          console.log("Template bound");
        });
      });
    </script>
    
    
* The attributes on the body are layout attributes, a la flexbox, meaning no margin, fit the entire page, and layout its elements vertically (layout and fit are useful when the components need their parents to have explict hight -- a common annoyance)
* The template tag is 'auto-binding' meaning you can insert data into it via javascript in the {{}} tags and do other cool stuff
* core-drawer-panel draws a drawer and main content area, and is automatically responsive, using whatever has been identified with 'core-drawer-toggle' as the drawer button
* core-drawer-panel will make its children marked with the attributes 'drawer' and 'main' accordingly
* core-header-panel gives you a header and main area, with the header optionally sticking to to the top of the page unless the mode attribute is something different.
* With core-header-panel, if you have a core-toolbar it automatically makes that the header, with the later element the content body
* Withing the core-toolbar, core-icon-button gives us a button with a menu icon (which will only show in narrow response mode due to core-drawer-panel's core-drawer-toogle attribute.
* The second core-icon-button is after a span flex which will 'flex' its width to take up all the remaining space, thereby putting the second icon to the right of the toolbar

This now gives us the responsive drawer, basic templating and a toolbar. Now for the menu and pages.

Menu:

    <core-menu selected="{{selected}}" valueattr="menuname">
      <core-item menuname="one">One</core-item>
      <core-item menuname="two">Two</core-item>
    </core-menu>

We use a core-menu, which is has its selected attribute bound to a template variable (which we set in javascript initially and then use later). And we use the core-items within to have their menu name set by the menuname attribute (which we specify on the core-menu). 

Pages:

    <core-pages selected="{{selected}}" valueattr="pagename">
      <section pagename="one">
        <div> Page one </div>
      </section>
      <section pagename="two">
        <div> Page two </div>
      </section>
    </core-pages>

The core-pages will only show one of its sections, named by the pagename attribute (set by valueattr). We specify the selected page by the bound template variable, which the core-menu above will accordingly set.

So we now have a menu in our drawer that controls what page to show. Here's the full body code:

    <body unresolved fullbleed fit layout vertical>
      <template is="auto-binding" id="template">
        <core-drawer-panel layout vertical>
          <core-header-panel drawer>
            <core-toolbar> 
              <span>Menu</span>
            </core-toolbar>
            <core-menu selected="{{selected}}" valueattr="menuname">
              <core-item menuname="one">One</core-item>
              <core-item menuname="two">Two</core-item>
            </core-menu>
          </core-header-panel>
          <core-header-panel  main>
            <core-toolbar>
              <core-icon-button icon="menu" core-drawer-toggle></core-icon-button>
              <div>{{title}}</div>
              <span flex></span>
              <core-icon-button icon="search"></core-icon-button>
            </core-toolbar>
            <core-pages selected="{{selected}}" valueattr="pagename">
              <section pagename="one">
                <div> Page one </div>
              </section>
              <section pagename="two">
                <div> Page two </div>
              </section>
            </core-pages>
          </core-header-panel>
        </core-drawer-panel>
      </template>
    </body>
    <script>
      window.addEventListener("polymer-ready", function(e) {
        var tmpl = document.querySelector("#template");
        tmpl.title = "Some title";
        tmpl.selected = "two"; // new
        tmpl.addEventListener('template-bound', function(e) {
          console.log("Template bound");
        });
      });
    </script>
    
Now finally onto routing (to be placed in your head tag).

    <more-routing-config driver="hash"></more-routing-config>
    <more-route name="one" path="/one"></more-route>
    <more-route name="two" path="/two">
        <more-route name="two-inner" path="/:name"></more-route>
    </more-route>

This sets routing to a use a #!/name url scheme, sets two urls with the name 'one' and 'two' and accordingly named urls, and gives the 'two' route to take a param like /#!/two/somenamehere.

More-route-selector works cleverly with anything that extends core-selector, i.e. core-menu and core-pages. We can get rid of the valueattr stuff and just give each core-item and section withing core-pages a route attribute instead that is named after the routes defined above:

    <more-route-selector>
      <core-menu selected="0">
        <core-item route="one">One</core-item>
        <core-item route="two">Two</core-item>
      </core-menu>
    </more-route-selector>

and the new core-pages:

    <more-route-selector>
      <core-pages selected="0">
        <section route="one">
          <div> Page one </div>
        </section>
        <section route="two">
          <div> Page two </div>
        </section>
      </core-pages>
    </more-route-selector>

We're using the "0" selected attribute now, since the routes will be selecting the pages so we may as well just show the first menu/page initially. (We can also remote the tmpl.selected line in our javascript too).

Now if we click on the menu, not only with the pages change, but the url will change too. And if we go to your_url#!/two it will go to the second page automatically.

Here's the final code for the body (remember to put the above more-routing stuff in your head tag):

    <body unresolved fullbleed fit layout vertical>
      <template is="auto-binding" id="template">
        <core-drawer-panel layout vertical>
          <core-header-panel drawer>
            <core-toolbar> 
              <span>Menu</span>
            </core-toolbar>
            <more-route-selector>
              <core-menu selected="0">
                <core-item route="one">One</core-item>
                <core-item route="two">Two</core-item>
              </core-menu>
            </more-route-selector>
          </core-header-panel>
          <core-header-panel  main>
            <core-toolbar>
              <core-icon-button icon="menu" core-drawer-toggle></core-icon-button>
              <div>{{title}}</div>
              <span flex></span>
              <core-icon-button icon="search"></core-icon-button>
            </core-toolbar>
            <more-route-selector>
              <core-pages selected="0">
                <section route="one">
                  <div> Page one </div>
                </section>
                <section route="two">
                  <div> Page two </div>
                </section>
              </core-pages>
            </more-route-selector>
          </core-header-panel>
        </core-drawer-panel>
      </template>
    </body>
    <script>
      window.addEventListener("polymer-ready", function(e) {
        var tmpl = document.querySelector("#template");
        tmpl.title = "Some title";
        tmpl.addEventListener('template-bound', function(e) {
          console.log("Template bound");
        });
      });
    </script>
