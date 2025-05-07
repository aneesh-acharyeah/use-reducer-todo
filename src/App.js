import React, { useReducer, useState } from "react";
import './App.css';

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,

        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ?
          { ...todo, completed: !todo.completed } : todo
      );
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    dispatch({ type: "ADD_TODO", payload: text });
    setText("");
  };
  return (
    <div className="App">
      <h2>📝 useReducer To-Do App</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setText(e.target.value)} placeholder="Add a todo..." />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })} style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer", }}>{todo.text}
            <button onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "REMOVE_TODO", payload: todo.id });
            }}>❌</button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
