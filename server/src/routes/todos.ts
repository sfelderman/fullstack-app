import express from 'express';
import Todo from '../models/Todo';

const todoRouter = express.Router();

// Create Endpoint
todoRouter.post('/todo', async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'req.body can not be empty'
    });
  }

  const todo = new Todo({ ...req.body });

  try {
    const data = await todo.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: err
    });
  }
});

// Find All Endpoint.
todoRouter.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({ ...req.params });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({
      message: 'Any error occurred while retrieving Todos.',
      error: err
    });
  }
});

// Find By Id Endpoint.
todoRouter.get('/todo/:todoId', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found with id: ' + req.params.todoId
      });
    }
    return res.status(200).json(todo);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: 'Todo not found with id: ' + req.params.todoId,
        error: err
      });
    }
    res.status(500).json({
      message: 'Error retrieving todo with id: ' + req.params.todoId,
      error: err
    });
  }
});

// Update Endpoint.
todoRouter.put('/todo/:todoId', async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: 'req.body can not be empty.'
    });
  }

  // FIXME params vs body?
  const todoId = req.params.todoId;

  try {
    const todo = await Todo.findByIdAndUpdate(todoId, { ...req.body }, { new: true });
    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found with id: ' + todoId
      });
    }
    return res.status(200).json(todo);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: 'Todo not found with id: ' + todoId,
        error: err
      });
    }
    res.status(500).json({
      message: 'Error updating todo with id: ' + todoId,
      error: err
    });
  }
});

// Delete Endpoint.
todoRouter.delete('/todo/:todoId', async (req, res) => {
  const todoId = req.params.todoId;
  try {
    const todo = await Todo.findByIdAndRemove(todoId); // Returns the updated document.

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found with id: ' + todoId
      });
    }
    res.status(200).json({
      message: 'Todo deleted successfully',
      todo
    });
  } catch (err) {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).json({
        message: 'Todo not found with id: ' + todoId,
        error: err
      });
    }
    return res.status(500).json({
      message: 'Error deleting todo with id: ' + todoId,
      error: err
    });
  }
});

export default todoRouter;
