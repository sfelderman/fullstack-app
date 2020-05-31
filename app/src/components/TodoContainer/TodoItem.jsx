import React from 'react';
import EditableText from '../common/EditableText';

const TodoItem = ({ _id, text, completed, updateTodo, removeTodo }) => {
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
    <React.Fragment>
      <div className='col-2' />
      <div className='col-0' style={{ cursor: 'pointer', width: '1.5rem' }} onClick={toggleTodo}>
        {completed ? <span>[X]</span> : <span>[&nbsp;&nbsp;]</span>}
        {/* <input className='' type='checkbox' checked={completed} onChange={toggleTodo} /> */}
      </div>
      <div className='col'>
        <EditableText onSubmit={editText}>{text}</EditableText>
      </div>
      <div className='col-0'>
        <button className='btn btn-outline-danger' onClick={() => removeTodo(_id)}>
          X
        </button>
      </div>
      <div className='col-2' />
    </React.Fragment>
  );
};

export default TodoItem;
