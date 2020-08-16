import React, { useState, useEffect } from 'react';
import TodoContainer from './TodoContainer';
import { Todo } from '../types/Todo';
import { loadInitialTodos } from '../actions/todoActions';
import { useOptimisticState } from '../OUI';

let id = 0;

const App = () => {
  const [todos, setTodos, setTodosBasic] = useOptimisticState([] as Todo[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadInitialTodos();
      setLoading(false);
      setTodosBasic(data);
    };
    fetchData();
  }, []);

  async function addTodo(text: string) {
    const optimisticTodo = { text, completed: false, _id: id++ } as Todo;

    setTodos<Todo>(
      fetch('/todo', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      }).then(res => res.json()),
      prevTodos => [...prevTodos, optimisticTodo],
      (newTodo, oldTodos) =>
        oldTodos.map(todo => (todo._id === optimisticTodo._id ? newTodo : todo))
    );
  }

  async function updateTodo(updateTodo: Todo) {
    setTodos<Todo>(
      fetch(`/todo/${updateTodo._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updateTodo })
      }).then(res => res.json()),
      prevTodos => prevTodos.map(todo => (todo._id === updateTodo._id ? updateTodo : todo)),
      (_, prevTodos) => [...prevTodos]
    );
  }

  async function removeTodo(_id: number | string) {
    setTodos(
      fetch(`/todo/${_id}`, {
        method: 'delete'
      }).then(res => res.json()),
      prevTodos => prevTodos.filter(todo => todo._id !== _id),
      (_, oldTodos) => [...oldTodos]
    );
  }

  return (
    <div className='App container'>
      {loading ? (
        'Loading...'
      ) : (
        <TodoContainer
          updateTodo={updateTodo}
          removeTodo={removeTodo}
          addTodo={addTodo}
          // addTodo={(text: string) => addTodo(text, setTodos)}
          todos={todos}
        />
      )}
    </div>
  );
};

export default App;
