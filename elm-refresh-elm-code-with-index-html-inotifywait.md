title: Elm-lang: Auto refresh Elm sources when you embed in an index.html file
tags: elm,inotifywait

`elm-react` works wonderfully when your entire project is in elm. However, you often embed Elm into a larger application.

Your `index.html` will look something like this:

    <div id="main"></div>
    <script src="main.js"></script>
    <script>
        var node = document.getElementById('main');
        var app = Elm.Main.embed(node);
    </script>

And you use `elm-make --output main.js` to generate the javascript.

But you need to return the elm-make command on every modification of your elm sources. And that's shi... less that optimal for productivity.

But Linux/Unix/whatever can help you there with its `inotifywait` command. With it, you can run a command on file modifications.

Go to the directory where your elm sources are and run this:

    inotifywait -e modify -m . | while read file; do elm-make Main.elm --output SOME_DIRECTORY_SOMEWHERE/main.js; done

You're telling it to wait for modify events in the current directory. And when it gets them it'll run the elm-make command.

Voila. Edit your elm code and refresh your browser. All is well in the world. Or at least your edit -> compile -> use cycle is shorter. Whatever.
