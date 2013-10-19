title: Using HtmlUnit, Selenium and Bootstrap
tags: java, bootstrap, java-testing, selenium

If you using Selenium's HtmlUnit driver on a website with Bootstrap, you must disable Javascript support.

    HtmlUnitDriver driver = new HtmlUnitDriver(false);
    
This is because HtmlUnit's Javascript support is patchy and doesn't seem to work well with Bootstrap's Javascript.

(I'm using HtmlUnit 2.12)

There may be a way around this to do with jQuery versions, I've read.

But if your website works without Javascript, then just testing without Javascript may be a solution.

Otherwise, PhantomJs seems to be another solution.
