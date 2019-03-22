title: React: Using react-spring intro
tags: javascript,reactjs

There's a nice animation library for react called react-springs. It uses hooks. So we'll be using hooks.

The first thing to look at is the `useSpring` custom hook. You pass it an object of your css properties (and whatever actually).

There's a sub property called `from` which takes an object of the initial position of the css property.

```
  const springProps = useSpring({ 
    left: "400px", 
    position: "absolute",
    from: { left: "0px" } 
  })
```

In this case we translate our left property from zero to four hundred. And we set the position to be absolute.

After we set this, we then pass the props into a `animated.div` component that understands them. The whole thing looks like this:

```
import { useSpring, animated } from 'react-spring'
...
function App2 () {
  const springProps = useSpring({ 
    left: "400px", 
    position: "absolute",
    from: { left: "0px" } 
  })
  return (
    <div>
      <animated.div style={springProps}>
        I will slide
      </animated.div>
    </div>
  );
}
```

And we thus animate. 

PS. You can animate your components inside the `animated.div` or do `const AnimatedThing = animated(Thing)` and then do `<AnimatedThing style="{springProps}">` but at the moment that means `Thing` must be a class component, not a functional components, for reasons that are beyond me.
