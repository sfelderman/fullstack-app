import Todo from '../../mongooseModels/Todo';
import { Todo as TodoType } from '../../resolvers-types';

export interface TodoAPI {
  getById: (id: string) => Promise<TodoType | null>;
  getTodos: () => Promise<TodoType[]>;
}

class MongoTodoApi implements TodoAPI {
  public initialize() {}

  public async getById(id: string): Promise<TodoType | null> {
    const val = await Todo.findById(id);
    if (!val) return null;

    return {
      ...val,
      id: val._id
    };
  }

  public async getTodos(): Promise<TodoType[]> {
    const vals = await Todo.find();
    if (!vals) return [];

    return vals.map(todo => ({
      ...todo,
      id: todo._id
    }));
  }
}

export default MongoTodoApi;
