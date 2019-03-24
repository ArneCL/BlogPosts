title: React: useReducer guide
tags: reactjs,javascript

React hooks introduced `useReducer`. This is an alternative to `useState`. And it comes from the redux world.

You give the reducer some state. Then based on actions (can be just names like 'add') it changes the state.

Let's first make a todo list example without a reducer, then afterward with a reducer, so we can see the difference.

### Version without a reducer

```
function Todos() {
  const [textInput, setTextInput] = useState("")
  const [todos, setTodos] = useState([ 
    { item: "example1", done: false }, 
    { item: "example2", done: false }])
  const addTodo = () => {
    const newTodos = todos.slice()
    newTodos.push({ item: textInput, done: false })
    setTodos(newTodos)
  }
  const deleteNote = (index) => {
    const newTodos = todos.slice()
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }
  const tickNote = (index) => {
    const newTodos = todos.slice()
    newTodos[index].done = !newTodos[index].done
    setTodos(newTodos)
  }
  return (
    <div>
      <input value={textInput} onChange={(e) => setTextInput(e.target.value)} />
      <button onClick={addTodo}>add</button>
      <div>
        {todos.map((item, i) => 
          <div key={i}>
            {item.item}
            <button onClick={() => tickNote(i)}>done? {""+item.done}</button>
            <button onClick={() => deleteNote(i)}>x</button>
          </div>
        )}
      </div>
    </div>
  )
}
```

We set two pieces of state. The first is to collect the `<input>` value. The second is our list of todo items.

Then the functions alter the todo list and update the state, and thus the user interface.

Now let's look at the version with a reducers.

### Version with a reducer

The first thing note is that we have global state that includes both the todos and the input text:

```
var initialList = {
  textInput: "",
  todos: [
    { item: "example1", done: false }, 
    { item: "example2", done: false }
  ]
}
```

This is then passed to the reducer as the second argument -- giving it initial data:

```
  var [state, dispatch] = useReducer(..., 
    initialList)
```

The `useReducer` returns two things. The updated state and a dispatcher. The dispatcher will be used to send 'actions', e.g. `dispatch(['delete', i])`.

How do we handle these 'actions'? It's all in the first argument to `useReducer`:

```
var [state, dispatch] = useReducer((state, [action, payload]) => {
  var state = { textInput: state.textInput, todos: state.todos }
  switch(action) {
    case 'updateText': 
      state.textInput = payload
      return state;
    case 'add': 
      state.todos.push({ item: state.textInput, done: false })
      state.textInput = ""
      return state;
    case 'delete': 
      state.todos.splice(payload, 1)
      return state;
    case 'mark': 
      state.todos[payload].done = !state.todos[payload].done
      return state;
    default: 
      return new Error("bad action")
  }
}, initialList)
```

The first argument of `useReducer` takes a function. This function takes two parameters: the existing state and the argument to `dispatch(...)`. (I'm destructuring this parameter for ease of use).

Then inside this function you use a switch statement with the 'action' you passed. And in our case something called a 'payload' which is the second item in the array that I will pass to `dispatch`.

So where is `dispatch` called? In our HTML:

```
<div>
  <input value={state.textInput} onChange={(e) => dispatch(["updateText", e.target.value])} />
  <button onClick={() => dispatch(['add'])}>add</button>
  <div>
    {state.todos.map((item, i) => 
      <div key={i}>
        {item.item}
        <button onClick={() => dispatch(['mark', i])}>done? {""+item.done}</button>
        <button onClick={() => dispatch(['delete', i])}>x</button>
      </div>
    )}
  </div>
</div>
```

Altogether our code looks like this:

```
function TodosReducer() {
  var initialList = {
    textInput: "",
    todos: [
      { item: "example1", done: false }, 
      { item: "example2", done: false }
    ]
  }
  var [state, dispatch] = useReducer((state, [action, payload]) => {
    switch(action) {
      case 'updateText': 
        return {...state, textInput: payload }
      case 'add': 
        state.todos.push({ item: state.textInput, done: false })
        return { ...state, textInput: "" }
      case 'delete': 
        state.todos.splice(payload, 1)
        return { ...state }
      case 'mark': 
        state.todos[payload].done = !state.todos[payload].done
        return { ...state }
      default: 
        throw new Error("bad action")
    }
  }, initialList)
  
  return (
    <div>
      <input value={state.textInput} onChange={(e) => dispatch(["updateText", e.target.value])} />
      <button onClick={() => dispatch(['add'])}>add</button>
      <div>
        {state.todos.map((item, i) => 
          <div key={i}>
            {item.item}
            <button onClick={() => dispatch(['mark', i])}>done? {""+item.done}</button>
            <button onClick={() => dispatch(['delete', i])}>x</button>
          </div>
        )}
      </div>
    </div>
  )
}
```
