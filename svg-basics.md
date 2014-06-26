title: SVG: Basics
tags: svg

A basic SVG file looks like this. 

    <?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg"
       width="550"
       height="550">
            <svg x="50" y="50">
                    <g>
                            <path   
                                    style="fill:#008000;stroke:#000000;stroke-width:5;"
                                    d="m 355,250 a 120,100 0 1 1 -350,0 100,100 0 1 1 350,0 z" />
                    </g>
            </svg>
    </svg>

It starts as a normal XML file, then has the svg tag, with the svg namespace. You can pass the width and height to such.

You can also embed svg elements, meaning you can position sub-svg images. A g tag does something similar, without the ability to specify an x and y position, but you can apply transformations to such and have its children inherit its styles.

The path command here is advanced, but it basically draws an eclipse. More on that later.

If you save it as file.svg you can view it in chrome or firefox easily. Or view it in http://scriptdraw.com#/ which only seems to work in chrome for me.
