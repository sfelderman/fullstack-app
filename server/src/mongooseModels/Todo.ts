import { Schema, model, Document } from 'mongoose';

const TodoSchema = new Schema({
  text: {
    type: String,
    required: false,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date
  }
  // userId: {
  //   type: ObjectId,
  //   required: true
  // }
});

export interface TodoInterface {
  title: string;
  text: string;
  completed: boolean;
  dueDate: Date;
  // userId: ObjectId;
}

export interface ITodoDocument extends TodoInterface, Document {}

const Todo = model<ITodoDocument>('todo', TodoSchema);

export default Todo;
