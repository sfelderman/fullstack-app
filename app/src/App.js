import React from 'react';
import './App.css';
import TodoList from './Todos';

const todos = [
  {
    text: 'first',
    completed: false,
  },
  {
    text: 'second',
    completed: true,
  },
];

const App = () => {
  return (
    <div className='App'>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
