title: CSS: Bottom sheet using flexbox and css transition
tags: css

We'll create two divs. The first one will have a lot of content. The second will have little. 

When you click on the second it will animate itself to take up most of the space. 

Here is the basic layout:

    <div class="main" style="height: 100%;">
      <div id="top" class="big" style="background-color: blue; overflow: hidden;">
        <div>I read</div>
        <div>the news</div>
        <div>today. </div>
        <div>Oh boy.</div>
        <div>A thou-</div>
        <div>-sand holes</div>
        <div>in Black-</div>
        <div>-burn Lan-</div>
        <div>-ca shire.</div>
      </div>
      <div id="bottomsheet" class="small" style="background-color: orange; overflow: hidden;">
        Bottom sheet
      </div>
    </div>

The divs have `overflow: hidden` css attributes so we can resize their height regardless of their content.

Let's now give our div a flexbox display, with the column direction. The `big` and `small` css classes will say that the first div will take up 80% and the second will take up 20%:

    <style>
      .main {
        display: flex;
        flex-direction: column;
      }
      .small {
        flex-basis: 20%;
      }
      .big {
        flex-basis: 80%;
      }
    </style>

We'll now have a 80/20 height ratio between our two divs. Now let's use the javascript (which you must put after your body's content) to swap those dimensions via swapping the css `big` and `small` classes:

    <script>
      document.querySelector("#bottomsheet").addEventListener("click", function() { 
        var small = document.querySelector(".small").classList;
        var big = document.querySelector(".big").classList;
        small.remove("small")
        small.add("big")
        big.remove("big")
        big.add("small")
      });
    </script>

This all works wonderfully, but there's no smooth animation. Let's fix that by saying both the `big` and `small` css classes will involve a `ease-in-out` transition on the `flex-basis` attribute that will take 0.3 seconds:

    .small, .big {
      transition-timing-function: ease-in-out;
      transition: flex-basis 0.3s;
    }

And voila.
