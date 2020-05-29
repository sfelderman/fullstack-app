import React from 'react';
import styles from './AddTodo.css';

const AddTodo = () => {
  return (
    <div className='AddTodo' style={styles}>
      <input type='input' placeholder='Create New TODO' />
    </div>
  );
};

export default AddTodo;
