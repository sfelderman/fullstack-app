import React, { Key } from 'react';
import { EditableText } from '../common';
import { UpdateTodoAction, RemoveTodoAction } from '../../actions/todoActions';

type TodoItem = {
  _id: Key;
  text: string;
  completed: boolean;
  updateTodo: UpdateTodoAction;
  removeTodo: RemoveTodoAction;
};

const TodoItem = ({ _id, text, completed, updateTodo, removeTodo }: TodoItem) => {
  const toggleTodo = () => {
    updateTodo({
      _id,
      text,
      completed: !completed
    });
  };

  const editText = (text: string) => {
    updateTodo({
      _id,
      text,
      completed
    });
  };

  return (
    <div className='TodoItem row my-2'>
      <div className='col-2' />
      <div className='col-auto'>
        {completed ? (
          <button className='btn btn-outline-success ' onClick={toggleTodo}>
            &#10003;
          </button>
        ) : (
          <button className='btn btn-outline-dark ' onClick={toggleTodo}>
            &nbsp; &nbsp;
          </button>
        )}
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
    </div>
  );
};

export default TodoItem;
