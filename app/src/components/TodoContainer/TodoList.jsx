import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, updateTodo }) => {
  return (
    <div className='container'>
      {todos && todos.length
        ? todos.map(todo => (
            <div className='row'>
              <TodoItem key={todo._id} {...todo} updateTodo={updateTodo} />
            </div>
          ))
        : 'No Todos To Display'}
    </div>
  );
};

export default TodoList;
