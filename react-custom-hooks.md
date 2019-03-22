title: React: Custom hooks
tags: javascript, react

Custom hooks are used to reuse logic. If you understand `setState` and `useEffect` then custom hooks are nothing special. Let's create one. They're just normal functions. They return a value too.

In our custom hook, we'll use `useEffect` to run a `setTimeout` when the component is rendered. It will set some state after a specified timeout. Therefore whatever uses this custom hook refuses this logic.

```
function useTimeout(timeout) {
  var timeoutHandler
  const [text, setText] = useState("Waiting...")
  useEffect(() => {
    timeoutHandler = setTimeout(() => setText("Waited!"), timeout)
    return () => {
      clearTimeout(timeoutHandler)
    }
  })
  return text
}
```

We can now refuse this logic in any component. For example:

```
function App () {
  const text = useTimeout(1000)
  return (
    <div>
      <div>{text}</div>
    </div>
  )
}
```

The `{text}` will change after one second from `Waiting...` to `Waited!`. There are better use cases.
