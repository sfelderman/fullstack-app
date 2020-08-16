import { Todo } from '../types/Todo';

let id = 0;

export const loadInitialTodos = (): Promise<Todo[]> => {
  return fetch('/todos').then(res => res.json());
};

// export const addTodo = (text: string, setTodos: ) => {
//   const optimisticTodo = { text, completed: false, _id: id++ } as Todo;

//   setTodos<Todo>(
//     fetch('/todo', {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ text })
//     }).then(res => res.json()),
//     prevTodos => [...prevTodos, optimisticTodo],
//     (newTodo, oldTodos) => oldTodos.map(todo => (todo._id === optimisticTodo._id ? newTodo : todo))
//   );
// };

// async function updateTodo(updateTodo: Todo) {
//   setTodos<Todo>(
//     fetch(`/todo/${updateTodo._id}`, {
//       method: 'put',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ ...updateTodo })
//     }).then(res => res.json()),
//     prevTodos => prevTodos.map(todo => (todo._id === updateTodo._id ? updateTodo : todo)),
//     (_, prevTodos) => [...prevTodos]
//   );
// }

// async function removeTodo(_id: number | string) {
//   setTodos(
//     fetch(`/todo/${_id}`, {
//       method: 'delete'
//     }).then(res => res.json()),
//     prevTodos => prevTodos.filter(todo => todo._id !== _id),
//     (_, oldTodos) => [...oldTodos]
//   );
// }
