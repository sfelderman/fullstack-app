import Todo, { ITodoDocument } from '../../mongooseModels/Todo';
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
  getTodos: () => Promise<TodoType[]>;
  createTodo: (args: MutationCreateTodoArgs) => Promise<TodoType>;
  updateTodo: (args: MutationUpdateTodoArgs) => Promise<TodoType | null>;
  deleteTodo: (id: string) => Promise<TodoType | null>;
}

class MongoTodoApi extends DataSource implements TodoAPI {
  private formatTodo(todo: ITodoDocument): TodoType {
    return {
      id: todo.id,
      completed: todo.completed,
      title: todo.title,
      text: todo.text,
      dueDate: todo.dueDate
    };
  }

  public async getById(id: string): Promise<TodoType | null> {
    const convertedId = new ObjectId(id);
    const todo = await Todo.findById(convertedId);
    if (!todo) return null;

    return this.formatTodo(todo);
  }

  public async getTodos(): Promise<TodoType[]> {
    const todos = await Todo.find();

    return todos.map(this.formatTodo);
  }

  public async createTodo(args: MutationCreateTodoArgs): Promise<TodoType> {
    const todo = new Todo(args);

    const savedTodo = await todo.save();
    return this.formatTodo(savedTodo);
  }

  public async updateTodo({ id, ...args }: MutationUpdateTodoArgs): Promise<TodoType | null> {
    const convertedId = new ObjectId(id);

    const valsWithNoNulls = stripNulls(args);
    const todo = await Todo.findByIdAndUpdate(convertedId, valsWithNoNulls, { new: true });

    if (!todo) return todo;
    return this.formatTodo(todo);
  }

  public async deleteTodo(id: string): Promise<TodoType | null> {
    const convertedId = new ObjectId(id);

    const todo = await Todo.findByIdAndDelete(convertedId);

    if (!todo) return todo;
    return this.formatTodo(todo);
  }
}

export default MongoTodoApi;
