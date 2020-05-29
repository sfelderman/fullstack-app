import React from 'react';
import TodoItem from '../TodoItem';
import styles from './TodoList.css';

const TodoList = ({ todos }) => {
  return (
    <div className='TodoList' style={styles}>
      {todos && todos.length
        ? todos.map(todo => <TodoItem key={todo._id} {...todo} />)
        : 'No Todos To Display'}
    </div>
  );
};

export default TodoList;
