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

export interface ITodo extends Document {
  text: string;
  completed: boolean;
}

const Todo = model<ITodo>('todo', TodoSchema);

export default Todo;
