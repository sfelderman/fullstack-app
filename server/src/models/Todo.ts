import { Schema, model, Document } from 'mongoose';

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

export interface Todo {
  text: string;
  completed: boolean;
}

export interface ITodoDocument extends Todo, Document {}

const Todo = model<ITodoDocument>('todo', TodoSchema);

export default Todo;
