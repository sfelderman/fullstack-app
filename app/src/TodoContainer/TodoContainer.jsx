import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import styles from './TodoContainer.css';

const TodoContainer = ({ todos }) => {
  return (
    <div className='TodoContainer' style={styles}>
      <h1>TODOS</h1>
      <AddTodo />
      <TodoList todos={todos} />
    </div>
  );
};

export default TodoContainer;
