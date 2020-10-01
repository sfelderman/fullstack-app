import Todo, { ITodoDocument } from '../../mongooseModels/Todo';
import { Todo as TodoType } from '../../resolvers-types';
import { DataSource } from 'apollo-datasource';
import { ObjectId } from 'mongodb';

export interface TodoAPI {
  getById: (id: string) => Promise<TodoType | null>;
  getTodos: () => Promise<TodoType[]>;
}

class MongoTodoApi extends DataSource implements TodoAPI {
  private formatTodo(todo: ITodoDocument): TodoType {
    return {
      id: todo.id,
      completed: todo.completed,
      text: todo.text
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
}

export default MongoTodoApi;
