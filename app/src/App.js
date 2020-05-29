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

  return (
    <div className='App' style={styles}>
      <TodoContainer addTodo={addTodo} todos={todos} />
    </div>
  );
};

export default App;
