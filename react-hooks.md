title: React: Using hooks
tags: react, javascript

React created functional components for when you need a component that doesn't have state and now they've released hooks which allow you to use state in functional components. Such is life. They're nice in some extra ways too.

Instead of setting state in a component class's constructor, you use `useState`. You pass it an argument which will be the initial state. And it gives you back that value and the a function to set that state. You can use `useState` as many times as you want for as much state as you want. Got that? Good?

Instead of using `componentDidMount` etc you use `useEffect`. The first argument is a function. The second argument can be empty which means that function is run on every `render`. If it's `[]` it's run only on component mount. If it's `[someValue]` then that will only be run when `someValue` is changed. It's best to give an example at this point:

```
import React, { useState, useEffect } from 'react';
...
function App2 () {
  const [ count, setCount] = useState(0)
  const click = () => setCount(count+1)

  useEffect(() => {
    setCount(10)
  }, [])

  return (
    <div>
      <div>{count}</div>
      <button onClick={click}>Click</button>
    </div>
  );
}
```

`useState(0)` sets an initial count state. `setCount` can be used to set the state. `useEffect` is used to set the count state to 10 when the component mounts. In this case it's just used for demonstation purposes. In addition you can return a function from `useEffect` and that function will be run to clean up after the render or after the compontent unmounted if `[]` was passed to `useEffect`.
