title: Javascript: Selenium setup in NodeJS with Firefox and ES6 modules.
tags: javascript,selenium

First install `npm install selenium-webdriver`. I'm on 4.0.0.

Then import Selenium with ES6 modules. We'll rename them since they're not built with ES6 modules in mind.

```
import * as webdriver from 'selenium-webdriver'
import * as firefox from 'selenium-webdriver/firefox'
let ff = firefox.default; 
let wd = webdriver.default
```

Then tell Selenium where your Firefox binary is and create the selenium instance.

```
let options = new ff.Options().setBinary('/usr/bin/firefox')
let browser = new wd.Builder().forBrowser('firefox').setFirefoxOptions(options).build()
```

Selenium will respond with promises. This is a little annoying so let's use an `async` function and use `await`.

```
async function test() {
  await browser.get("http://localhost:8080/")
  let next = await browser.findElement(wd.By.linkText("next"))
  await next.click()
  let pageSource = await browser.getPageSource()
  let hasPage = pageSource.indexOf("Page 2 of 2") != -1
  assert.equal(hasPage, true, "Checking if we're on page 2")
})
```

Finally we use the `findElement` method, once we've loaded a page, and then use the `By` class to find the link text. Then we click on it.

We then get the page source and do some string searching on that to use a normal nodejs `assert` statement.
