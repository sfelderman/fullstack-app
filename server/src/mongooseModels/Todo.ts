import { ObjectId } from 'mongodb';
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
  // userId: {
  //   type: ObjectId,
  //   required: true
  // }
});

export interface TodoInterface {
  text: string;
  completed: boolean;
  // userId: ObjectId;
}

export interface ITodoDocument extends TodoInterface, Document {}

const Todo = model<ITodoDocument>('todo', TodoSchema);

export default Todo;
