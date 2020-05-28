import React from 'react';

const TodoItem = ({ text, completed }) => {
  return (
    <div className='TodoItemContainer'>
      <div>Text: {text}</div>
      <div>Completed: {completed}</div>
    </div>
  );
};

export default TodoItem;
