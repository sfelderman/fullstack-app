import React, { useState } from 'react';
import { AddTodoAction } from '../../actions/todoActions';

type AddTodo = {
  addTodo: AddTodoAction;
};

const AddTodo = ({ addTodo }: AddTodo) => {
  const [text, setText] = useState('');

  const handleSubmit = (evt: React.FormEvent) => {
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
    <React.Fragment>
      <div className='col-2' />
      <form className='col-8 form-group' onSubmit={handleSubmit}>
        <input
          className='form-control text-center'
          type='text'
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Create New TODO'
        />
      </form>
      <div className='col-2' />
    </React.Fragment>
  );
};

export default AddTodo;
