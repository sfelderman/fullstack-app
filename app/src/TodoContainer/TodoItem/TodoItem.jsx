import React from 'react';
import styles from './TodoItem.css';
import { useState } from 'react';

const TodoItem = ({ _id, text, completed, updateTodo }) => {
  const toggleTodo = () => {
    updateTodo({
      _id,
      text,
      completed: !completed
    });
  };

  return (
    <div className='TodoItem' style={styles}>
      <div className='checkbox'>
        <input type='checkbox' checked={completed} onChange={toggleTodo} />
      </div>

      <div className='text'>{text}</div>
    </div>
  );
};

export default TodoItem;
