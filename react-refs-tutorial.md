title: React: Using Refs
tags: javascript,reactjs

Sometimes you want direct access to DOM nodes, instead of using props and state to control them. You use `refs` for this.

You define a ref with `React.createRef()` and then you set it with `<div ref={yourRefName} ...>` and then you can use it in `componentDidMount` or in event listeners etc.

The standard example is using a ref to focus a input element:

```
class AThing extends Component {

  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  componentDidMount() {
    this.myRef.current.focus()
  }

  render() {
    return (
      <input ref={this.myRef} value="highlight" />
    )  
  }
}
```

You can achieve the same things in functional components with the `useRef` hook:

```
function AThing2() {
  var myRef = useRef(null)
  useEffect(() => {
    myRef.current.focus()
  }, [])

  return (
    <input ref={myRef} value="highlight!" />
  )  
}
```

You can attach hooks to html node and react class components but not react functional components.
