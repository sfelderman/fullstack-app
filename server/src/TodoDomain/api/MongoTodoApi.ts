import Todo from '../../mongooseModels/TodoModel';
import {
  MutationCreateTodoArgs,
  MutationUpdateTodoArgs,
  Todo as TodoType
} from '../../resolvers-types';
import { DataSource } from 'apollo-datasource';
import { ObjectId } from 'mongodb';
import stripNulls from '../../util/stripNulls';

export interface TodoAPI {
  getById: (id: string) => Promise<TodoType | null>;
  getTodos: (args: { userId: string }) => Promise<TodoType[]>;
  createTodo: (args: MutationCreateTodoArgs & { userId: string }) => Promise<TodoType>;
  updateTodo: (args: MutationUpdateTodoArgs) => Promise<TodoType | null>;
  deleteTodo: (id: string) => Promise<TodoType | null>;
}

class MongoTodoApi extends DataSource implements TodoAPI {
  public async getById(id: string): Promise<TodoType | null> {
    const convertedId = new ObjectId(id);
    const todo = await Todo.findById(convertedId);
    if (!todo) return null;

    return todo.toObject();
  }

  public async getTodos(args: { userId: string }): Promise<TodoType[]> {
    const todos = await Todo.find(args);

    return todos.map(todo => todo.toObject());
  }

  public async createTodo(args: MutationCreateTodoArgs & { userId: string }): Promise<TodoType> {
    const todo = new Todo(args);

    const savedTodo = await todo.save();
    return savedTodo.toObject();
  }

  public async updateTodo({ id, ...args }: MutationUpdateTodoArgs): Promise<TodoType | null> {
    const convertedId = new ObjectId(id);

    const valsWithNoNulls = stripNulls(args);
    const todo = await Todo.findByIdAndUpdate(convertedId, valsWithNoNulls, { new: true });

    if (!todo) return todo;
    return todo.toObject();
  }

  public async deleteTodo(id: string): Promise<TodoType | null> {
    const convertedId = new ObjectId(id);

    const todo = await Todo.findByIdAndDelete(convertedId);

    if (!todo) return todo;
    return todo.toObject();
  }
}

export default MongoTodoApi;
