import React from 'react';
import styles from './TodoItem.css';
import EditableText from '../../common/EditableText';

const TodoItem = ({ _id, text, completed, updateTodo }) => {
  const toggleTodo = () => {
    updateTodo({
      _id,
      text,
      completed: !completed
    });
  };

  const editText = text => {
    updateTodo({
      _id,
      text,
      completed
    });
  };

  return (
    <div className='TodoItem' style={styles}>
      <div className='checkbox'>
        <input type='checkbox' checked={completed} onChange={toggleTodo} />
      </div>

      <EditableText onSubmit={editText}>{text}</EditableText>
    </div>
  );
};

export default TodoItem;
