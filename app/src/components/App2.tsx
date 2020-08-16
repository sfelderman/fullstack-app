import React, { useState, useEffect } from 'react';
import TodoContainer from './TodoContainer';
import { useOptimisticState } from '../OUI/index2';
import { Todo } from '../types/Todo';

let id = 0;

const App = () => {
  const [todos, setTodos] = useOptimisticState([] as Todo[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTodos(async () => {
        const data: Todo[] = await fetch('/todos').then(res => res.json());
        setLoading(false);
        return data;
      });
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

  return (
    <div className='App container'>
      {loading ? (
        'Loading...'
      ) : (
        <TodoContainer
          updateTodo={() => {}}
          removeTodo={() => {}}
          addTodo={addTodo}
          todos={todos}
        />
      )}
    </div>
  );
};

export default App;
