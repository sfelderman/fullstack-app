import React from 'react';
import TodoItem from '../TodoItem';

const TodoList = ({ todos }) => {
  return (
    <div>
      <h1>TODOS</h1>
      {!(todos && todos.length) ? (
        <div>No Todos To Display </div>
      ) : (
        <ul>
          {todos.map(todo => (
            <TodoItem {...todo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
