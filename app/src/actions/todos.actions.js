async function addTodo(text) {
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
    (newTodo, oldTodos) => oldTodos.map(todo => (todo._id === optimisticTodo._id ? newTodo : todo))
  );
}

async function updateTodo(updateTodo) {
  setTodos(
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

async function removeTodo(_id) {
  setTodos(
    fetch(`/todo/${_id}`, {
      method: 'delete'
    }).then(res => res.json()),
    prevTodos => prevTodos.filter(todo => todo._id !== _id),
    (_, oldTodos) => [...oldTodos]
  );
}
