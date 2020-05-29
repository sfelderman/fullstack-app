import React from 'react';
import TodoItem from '../TodoItem';
import styles from './TodoList.css';

const TodoList = ({ todos, updateTodo }) => {
  return (
    <div className='TodoList' style={styles}>
      {todos && todos.length
        ? todos.map(todo => <TodoItem key={todo._id} {...todo} updateTodo={updateTodo} />)
        : 'No Todos To Display'}
    </div>
  );
};

export default TodoList;
