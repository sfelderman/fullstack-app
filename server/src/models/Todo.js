import { Schema, model } from 'mongoose';
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
const Todo = model('todo', TodoSchema);

export default Todo;
