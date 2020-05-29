import React from 'react';
import styles from './TodoItem.css';

const TodoItem = ({ text, completed }) => {
  return (
    <div className='TodoItem' style={styles}>
      <div className='checkbox'>
        <input type='checkbox' checked={completed} />
      </div>

      <div className='text'>{text}</div>
    </div>
  );
};

export default TodoItem;
