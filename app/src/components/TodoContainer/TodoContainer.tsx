import React from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { Todo } from '../../types/Todo';
import { AddTodoAction, UpdateTodoAction, RemoveTodoAction } from '../../actions/todoActions';

type TotoContainer = {
  todos: Todo[];
  addTodo: AddTodoAction;
  updateTodo: UpdateTodoAction;
  removeTodo: RemoveTodoAction;
};

const TodoContainer = ({ todos, addTodo, updateTodo, removeTodo }: TotoContainer) => {
  return (
    <React.Fragment>
      <div className='row col'>
        <h1 className='col text-center'>TODOS</h1>
      </div>
      <div className='row'>
        <AddTodo addTodo={addTodo} />
      </div>
      <div className='row'>
        <TodoList updateTodo={updateTodo} removeTodo={removeTodo} todos={todos} />
      </div>
    </React.Fragment>
  );
};

export default TodoContainer;
