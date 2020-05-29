import React, { useState } from 'react';
import styles from './AddTodo.css';

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();

    const value = text.trim();
    if (!value.length) {
      console.warn('text must have length');
      return;
    }
    addTodo(value);
    setText('');
  };

  return (
    <form className='AddTodo' style={styles} onSubmit={handleSubmit}>
      <input
        type='text'
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder='Create New TODO'
      />
    </form>
  );
};

export default AddTodo;
