const router = require('express').Router();
const Todo = require('../models/Todo');

// Create Endpoint
router.post('/todo', (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: 'req.body can not be empty'
    });
    return;
  }

  const todo = new Todo({
    ...req.body
  });

  todo
    .save()
    .then(todo => {
      res.status(201).json(todo);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message,
        error: err
      });
    });
});

// Find All Endpoint.
router.get('/todos', (req, res) => {
  Todo.find({
    ...req.params
  }) //Returns an array.
    .then(todos => {
      res.status(200).json(todos);
    })
    .catch(err => {
      res.stats(500).json({
        message: 'Some error occurred while retrieving Todos.',
        error: err
      });
    });
});

// Find By Id Endpoint.
router.get('/todo/:todoId', (req, res) => {
  Todo.findById(req.params.todoId) //Returns single document.
    .then(todo => {
      if (!todo) {
        res.status(404).json({
          message: 'Todo not found with id: ' + req.params.todoId
        });
        return;
      }
      res.status(200).json(todo);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        res.status(404).json({
          message: 'Todo not found with id: ' + req.params.todoId,
          error: err
        });
        return;
      }
      res.status(500).json({
        message: 'Error retrieving todo with id: ' + req.params.todoId,
        error: err
      });
    });
});

// Update Endpoint.
router.put('/todo/:todoId', (req, res) => {
  if (!req.body) {
    res.status(400).json({
      resolved: 'failure',
      message: 'req.body can not be empty.'
    });
  }

  Todo.findByIdAndUpdate(
    req.params.todoId,
    {
      ...req.body
    },
    {
      new: true
    }
  )
    .then(todo => {
      if (!todo) {
        res.status(404).json({
          message: 'Todo not found with id ' + req.params.todoId
        });
        return;
      }
      res.status(200).json(todo);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        res.status(404).json({
          message: 'Todo not found with id: ' + req.params.todoId,
          error: err
        });
        return;
      }
      res.status(500).json({
        message: 'Error updating todo with id: ' + req.params.todoId,
        error: err
      });
    });
});

// Delete Endpoint.
router.delete('/todo/:todoId', (req, res) => {
  Todo.findByIdAndRemove(req.params.todoId) //Returns the updated document.
    .then(todo => {
      if (!todo) {
        res.status(404).json({
          message: 'Todo not found with id: ' + req.params.todoId
        });
        return;
      }
      res.status(200).json({
        message: 'Todo deleted successfully!',
        todo
      });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        res.status(404).json({
          message: 'Todo not found with id: ' + req.params.todoId,
          error: err
        });
        return;
      }
      res.status(500).json({
        resolved: 'failure',
        message: 'Error deleting todo with id: ' + req.params.todoId,
        error: err
      });
    });
});

module.exports = router;
