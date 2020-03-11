title: CSS: Grid
tags: css, css-grid

So CSS grid lets align your divs in grids. It's more visual and slightly less confusing than flexbox but needs more css -- harder to quickly hack.

Our grid will have a top spanning header, an image under the header to the left and a text area to the right of the image.

```
    <div id="grid">
        <div class="head">heading</div>
        <div class="img">img</div>
        <div class="text">text</div>
    </div>
```

Let's give it each element a background colour and a border:

```
<style>
    div {
        border: solid black 1px;
    }
    .head {
        font-size: 40px;
        background-color: lightblue;
    }
    .text {
        background-color: lightgrey;
    }

    .img {
        background-color: lightgreen;
    }
</style>  
```

It isn't a grid yet. Let's make one with a 200px height:

```
    #grid {
        height: 200px;
        display: grid;
        grid-template: 
        'head head head' 25%
        'img text text' auto
        'img text text' auto
        / 30% auto auto;
    }
```

We name of grid pieces in quotation marks on three separate lines.

* the top line has three elements. They're all called "head".
* the middle line has three elements. The first is called "img". The rest are "text".
* the bottom line has three elements. The first is called "img". The rest are "text".

After each line we specify the height: `25%` and `auto` and `auto`, in our case.

After the three lines, we specify the row widths after a slash: `30%` and `auto` and `auto`.

So that's done: https://repl.it/repls/UncommonConcreteInitializationfile 

But we want to centre our header. We could use some css grid properties. But that would centre our `head` div, including the background colour. So let's just use css flexbox instead:


```
    .head {
        font-size: 40px;
        background-color: lightblue;
        display: flex;
        justify-content: center;
        align-items: center;
    }

```
