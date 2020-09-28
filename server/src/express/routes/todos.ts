import { Router } from 'express';
import Todo, { ITodoDocument } from '../../mongooseModels/Todo';
import validateCreateTodo from '../validation/todos/validateCreateTodo';

const todoRouter = Router();

const ownsTodo = (todo: ITodoDocument, userId?: string) => todo.userId.equals(userId as string);

// Create Endpoint
todoRouter.post('/', async (req, res) => {
  const userId = req.user?.id;
  const { errors, isValid } = validateCreateTodo(req.body);
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  const todo = new Todo({ ...req.body, userId });

  try {
    const data = await todo.save();
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: err
    });
  }
});

// Find All Endpoint.
todoRouter.get('/', async (req, res) => {
  const userId = req.user?.id;
  try {
    const todos = await Todo.find({ ...req.params, userId });
    return res.status(200).json(todos);
  } catch (err) {
    return res.status(500).json({
      message: 'Any error occurred while retrieving Todos.',
      error: err
    });
  }
});

// Find By Id Endpoint.
todoRouter.get('/:todoId', async (req, res) => {
  const userId = req.user?.id;
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found with id: ' + req.params.todoId
      });
    }

    if (!ownsTodo(todo, userId)) {
      return res.status(403).json({
        message: 'Forbidden'
      });
    }

    return res.status(200).json(todo);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: 'Todo not found with id: ' + req.params.todoId
      });
    }

    return res.status(500).json({
      message: 'Error retrieving todo with id: ' + req.params.todoId,
      error: err
    });
  }
});

// Update Endpoint.
todoRouter.put('/:todoId', async (req, res) => {
  const userId = req.user?.id;
  if (!req.body) {
    return res.status(400).json({
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

    if (!ownsTodo(todo, userId)) {
      return res.status(403).json({
        message: 'Forbidden'
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
    return res.status(500).json({
      message: 'Error updating todo with id: ' + todoId,
      error: err
    });
  }
});

// Delete Endpoint.
todoRouter.delete('/:todoId', async (req, res) => {
  const userId = req.user?.id;
  const todoId = req.params.todoId;
  try {
    let todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found with id: ' + todoId
      });
    }

    if (!ownsTodo(todo, userId)) {
      return res.status(403).json({
        message: 'Forbidden'
      });
    }

    todo = await todo.deleteOne();

    return res.status(200).json({
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
