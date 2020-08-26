import { Schema, model, Document } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export interface User {
  name: string;
  email: string;
  password: string;
  date: Date;
}

export interface IUserDocument extends User, Document {}

const Todo = model<IUserDocument>('user', UserSchema);

export default Todo;
