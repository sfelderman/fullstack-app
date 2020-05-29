import React, { useState } from 'react';
import styles from './App.css';
import TodoContainer from './TodoContainer';

const mockedTodos = [
  {
    _id: 111,
    text: 'first one',
    completed: false
  },
  {
    _id: 345,
    text: 'second one with a longer description',
    completed: true
  }
];

let id = mockedTodos.length + 1;

const App = () => {
  const [todos, setTodos] = useState(mockedTodos);

  function addTodo(text) {
    const todo = {
      _id: id++,
      text,
      completed: false
    };

    setTodos([todo, ...todos]);
  }

  function updateTodo(todo) {
    const newTodos = todos.reduce((arr, cur) => {
      if (cur._id === todo._id) {
        arr.push(todo);
      } else {
        arr.push(cur);
      }

      return arr;
    }, []);
    setTodos(newTodos);
  }

  return (
    <div className='App' style={styles}>
      <TodoContainer updateTodo={updateTodo} addTodo={addTodo} todos={todos} />
    </div>
  );
};

export default App;
