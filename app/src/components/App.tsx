import React, { useState, useEffect } from 'react';
import TodoContainer from './TodoContainer';
import { useOptimisticState } from '../OUI';
let id = 0;

const App = () => {
  const [todos, setTodos] = useOptimisticState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTodos(async () => {
        const data = await fetch('/todos').then(res => res.json());
        setLoading(false);
        return data;
      });
    };
    fetchData();
  }, []);

  async function addTodo(text: any) {
    const optimisticTodo = { text, completed: false, _id: id++ };
    setTodos(
      fetch('/todo', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      }).then(res => res.json()),
      (prevTodos: any) => [...prevTodos, optimisticTodo],
      (newTodo: any, oldTodos: any[]) =>
        oldTodos.map((todo: { _id: number }) => (todo._id === optimisticTodo._id ? newTodo : todo))
    );
  }

  async function updateTodo(updateTodo: { _id: any }) {
    setTodos(
      fetch(`/todo/${updateTodo._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updateTodo })
      }).then(res => res.json()),
      (prevTodos: any[]) =>
        prevTodos.map((todo: { _id: any }) => (todo._id === updateTodo._id ? updateTodo : todo)),
      (_: any, prevTodos: any) => [...prevTodos]
    );
  }

  async function removeTodo(_id: any) {
    setTodos(
      fetch(`/todo/${_id}`, {
        method: 'delete'
      }).then(res => res.json()),
      (prevTodos: any[]) => prevTodos.filter((todo: { _id: any }) => todo._id !== _id),
      (_: any, oldTodos: any) => [...oldTodos]
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
          todos={todos}
        />
      )}
    </div>
  );
};

export default App;
