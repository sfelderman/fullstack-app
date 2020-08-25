import React, { useState, useEffect } from 'react';
import TodoContainer from './TodoContainer';
import useTodoActions from '../actions/todoActions';
import { Spinner } from './common';

const App = () => {
  const { todos, loadInitialTodos, addTodo, updateTodo, removeTodo } = useTodoActions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialTodos(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className='App container'>
      {loading ? (
        <Spinner message='Loading...' />
      ) : (
        <TodoContainer
          updateTodo={updateTodo}
          removeTodo={removeTodo}
          addTodo={addTodo}
          todos={todos}
        />
      )}
    </div>
  );
};

export default App;
