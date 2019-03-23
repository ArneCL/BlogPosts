title: React: Context tutorial
tags: reactjs,javascript

Instead of passing data and functions around as props around you can use a context. 

But first let's look an example app that doesn't use context. It uses props to communicate between components.

First we have a `UserInfo` component that displays a name:

```
function UserInfo({ name }) {
  return (
    <div>Your name is {name}</div>
  )
}
```

Then we have a `ChooseUsername` that on `onChange` in an `input` element calls a function that's passed in as a prop.

```
function ChooseUsername({ onChooseUsername }) {
  return (
    <div>
      <input placeholder="username" 
        onChange={(e) => onChooseUsername(e.target.value) } />
    </div>
  )
}
```

Finally we have the `App` component that threads those two components together: once `ChooseUsername` edits its input field then a function is called on `App` that sets some new state, which in turn updates the `UserInfo` component:

```
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "Blank"
    }
  }

  setName = (newName) => {
    this.setState({
      name: newName
    })
  }

  render() {
    return (
      <div>
        <ChooseUsername onChooseUsername={this.setName}></ChooseUsername>
        <hr />
        <UserInfo name={this.state.name}></UserInfo>
      </div>
    )  
  }
}
```

Now let's do the same again but with a react context.

Let's first look at our `ChooseUsername` and `UserInfo` components. I've given them a version 2 name.

```
function UserInfo2() {
  const state = useContext(App2Context);
  return (
    <div>Your name is {state.name}</div>
  )
}

function ChooseUsername2() {
  const state = useContext(App2Context);
  return (
    <div>
      <input placeholder="username" 
        onChange={(e) => state.onChooseUsername(e.target.value) } />
    </div>
  )
}
```

They no longer take in props. They get noth the `name` and `onChooseUsername` from the context that they get from `useContext(App2Context)`. So what is `App2Context`? It's fairly simple:

```
const App2Context = React.createContext(null);
```

Obviously it contains now data at the moment. We want it to contain the state for our app:

```
 this.state = {
    name: "Blank",
    onChooseUsername: (newName) => {
      this.setState({
        name: newName
      })
    }
  } 
```

(Note I've put `onChooseUsername` in the state so the components can use it)

And we make the `App2Context` have this state through `<App2Context.Provider>`.

Let's look at our `App2` class which uses the context:


```
const App2Context = React.createContext(null);

class App2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "Blank",
      onChooseUsername: (newName) => {
        this.setState({
          name: newName
        })
      }
    }
  }
  render() {
    return (
      <App2Context.Provider value={this.state}>
        <ChooseUsername2></ChooseUsername2>
        <hr />
        <UserInfo2></UserInfo2>
      </App2Context.Provider>
    )  
  }
}
```

So `UserInfo2` and `ChoseUsername2` will use the context that's defined by `<App2Context.Provider value={this.state}>`. And when we call the `onChooseUsername` function it will update the state, and thus to context, and thus rerender the components in the tree.

So, why do this? Because passing around new props every time you add a new variable or function to your state is annoying.
