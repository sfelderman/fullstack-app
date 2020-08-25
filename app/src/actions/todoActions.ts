import { Todo } from '../types/Todo';
import useOptimisticState from '../OUI';

export type LoadInitialTodosAction = (callback: () => void) => Promise<void>;
export type AddTodoAction = (text: string) => void;
export type UpdateTodoAction = (updateTodo: Todo) => void;
export type RemoveTodoAction = (_id: number | string) => void;

let id = 0;

const useTodoActions = () => {
  const [todos, setTodos, setTodosAdvanced] = useOptimisticState<Todo[]>([]);

  const loadInitialTodos = async (callback: () => void) => {
    const initialTodos = (await fetch('/todos').then(res => res.json())) as Todo[];
    setTodos(initialTodos);
    callback();
  };

  const addTodo = (text: string) => {
    const optimisticTodo = { text, completed: false, _id: id++ } as Todo;

    setTodosAdvanced<Todo>(
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
  };

  const updateTodo = (updateTodo: Todo) => {
    setTodosAdvanced<Todo>(
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
  };

  const removeTodo = (_id: number | string) => {
    setTodosAdvanced(
      fetch(`/todo/${_id}`, {
        method: 'delete'
      }).then(res => res.json()),
      prevTodos => prevTodos.filter(todo => todo._id !== _id),
      (_, oldTodos) => [...oldTodos]
    );
  };

  return {
    todos,
    setTodos,
    loadInitialTodos,
    addTodo,
    updateTodo,
    removeTodo
  };
};

export default useTodoActions;
