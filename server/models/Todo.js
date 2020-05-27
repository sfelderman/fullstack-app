const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
module.exports = Todo = mongoose.model("todo", TodoSchema);
