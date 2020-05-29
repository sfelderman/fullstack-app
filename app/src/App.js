import React from 'react';
import styles from './App.css';
import TodoContainer from './TodoContainer';

const todos = [
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

const App = () => {
  return (
    <div className='App' style={styles}>
      <TodoContainer todos={todos} />
    </div>
  );
};

export default App;
