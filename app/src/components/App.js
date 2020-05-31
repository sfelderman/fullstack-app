import React, { useState, useEffect } from 'react';
import TodoContainer from './TodoContainer';

const mockedTodos = [
  {
    _id: 111,
    text: 'first one',
    completed: false
  },
  {
    _id: 345,
    text: 'second one with a longer description',
    completed: true
  }
];

let id = mockedTodos.length + 1;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/todos').then(res => res.json());
      setTodos(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  async function addTodo(text) {
    // Enhancement: could add todo to local state then update once response is back

    const newTodo = await fetch('/todo', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    }).then(res => res.json());

    setTodos([...todos, newTodo]);
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
