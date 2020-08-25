import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../../types/Todo';
import { UpdateTodoAction, RemoveTodoAction } from '../../actions/todoActions';

type TodoList = {
  todos: Todo[];
  updateTodo: UpdateTodoAction;
  removeTodo: RemoveTodoAction;
};

const TodoList = ({ todos, updateTodo, removeTodo }: TodoList) => {
  return (
    <div className='container'>
      {todos && todos.length
        ? todos.map((todo: Todo) => (
            <TodoItem key={todo._id} {...todo} removeTodo={removeTodo} updateTodo={updateTodo} />
          ))
        : 'No Todos To Display'}
    </div>
  );
};

export default TodoList;
