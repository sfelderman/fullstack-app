import React from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

const TodoContainer = ({ todos, addTodo, updateTodo }) => {
  return (
    <React.Fragment>
      <div className='row col'>
        <h1 className='col text-center'>TODOS</h1>
      </div>
      <div className='row'>
        <AddTodo addTodo={addTodo} />
      </div>
      <div className='row'>
        <TodoList updateTodo={updateTodo} todos={todos} />
      </div>
    </React.Fragment>
  );
};

export default TodoContainer;
