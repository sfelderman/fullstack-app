import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, updateTodo, removeTodo }) => {
  return (
    <div className='container'>
      {todos && todos.length
        ? todos.map(todo => <TodoItem {...todo} removeTodo={removeTodo} updateTodo={updateTodo} />)
        : 'No Todos To Display'}
    </div>
  );
};

export default TodoList;
