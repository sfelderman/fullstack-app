import React, { useState, useEffect } from 'react';
import TodoContainer from './TodoContainer';
import { useOptimisticState } from '../OUI';

let id = 0;

const App = ({ initialTodos, initialLoading }) => {
  const [todos, setTodos] = useOptimisticState(initialTodos || []);
  // const [todos, setTodos] = useOptimisticState(initialTodos || []);
  const [loading, setLoading] = useState(!initialTodos || initialLoading);

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

  async function addTodo(text) {
    // Enhancement: could add todo to local state then update once response is back
    const optimisticTodo = { text, completed: false, _id: id++ };
    setTodos(
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
    // const newTodo = await fetch('/todo', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ text })
    // }).then(res => res.json());
    // debugger;
    // setTodos([...todos, newTodo]);
  }

  async function updateTodo(todo) {
    const updatedTodo = await fetch(`/todo/${todo._id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...todo })
    }).then(res => res.json());

    const newTodos = todos.reduce((arr, cur) => {
      if (cur._id === todo._id) {
        arr.push(updatedTodo);
      } else {
        arr.push(cur);
      }

      return arr;
    }, []);
    setTodos(newTodos);
  }

  async function removeTodo(_id) {
    const removedTodo = await fetch(`/todo/${_id}`, {
      method: 'delete'
    }).then(res => res.json());

    const newTodos = todos.reduce((arr, cur) => {
      if (cur._id !== _id) {
        arr.push(cur);
      }
      return arr;
    }, []);
    setTodos(newTodos);
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
