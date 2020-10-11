import { ObjectId } from 'mongodb';

import { Schema, model, Document } from 'mongoose';

const TodoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
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
});

TodoSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

TodoSchema.set('toObject', {
  virtuals: true
});

export interface TodoInterface {
  title: string;
  text: string;
  completed: boolean;
  dueDate: Date;
  userId: ObjectId;
}

export interface ITodoDocument extends TodoInterface, Document {}

const Todo = model<ITodoDocument>('todo', TodoSchema);

export default Todo;
