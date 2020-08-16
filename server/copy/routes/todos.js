// "use strict";
// var __assign = (this && this.__assign) || function () {
//     __assign = Object.assign || function(t) {
//         for (var s, i = 1, n = arguments.length; i < n; i++) {
//             s = arguments[i];
//             for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
//                 t[p] = s[p];
//         }
//         return t;
//     };
//     return __assign.apply(this, arguments);
// };
// var router = require('express').Router();
// var Todo = require('../models/Todo');
// // Create Endpoint
// router.post('/todo', function (req, res) {
//     if (!req.body) {
//         res.status(400).json({
//             message: 'req.body can not be empty'
//         });
//         return;
//     }
//     var todo = new Todo(__assign({}, req.body));
//     todo
//         .save()
//         .then(function (todo) {
//         res.status(201).json(todo);
//     })
//         .catch(function (err) {
//         res.status(500).json({
//             message: err.message,
//             error: err
//         });
//     });
// });
// // Find All Endpoint.
// router.get('/todos', function (req, res) {
//     Todo.find(__assign({}, req.params)) //Returns an array.
//         .then(function (todos) {
//         res.status(200).json(todos);
//     })
//         .catch(function (err) {
//         res.stats(500).json({
//             message: 'Some error occurred while retrieving Todos.',
//             error: err
//         });
//     });
// });
// // Find By Id Endpoint.
// router.get('/todo/:todoId', function (req, res) {
//     Todo.findById(req.params.todoId) //Returns single document.
//         .then(function (todo) {
//         if (!todo) {
//             res.status(404).json({
//                 message: 'Todo not found with id: ' + req.params.todoId
//             });
//             return;
//         }
//         res.status(200).json(todo);
//     })
//         .catch(function (err) {
//         if (err.kind === 'ObjectId') {
//             res.status(404).json({
//                 message: 'Todo not found with id: ' + req.params.todoId,
//                 error: err
//             });
//             return;
//         }
//         res.status(500).json({
//             message: 'Error retrieving todo with id: ' + req.params.todoId,
//             error: err
//         });
//     });
// });
// // Update Endpoint.
// router.put('/todo/:todoId', function (req, res) {
//     if (!req.body) {
//         res.status(400).json({
//             message: 'req.body can not be empty.'
//         });
//     }
//     Todo.findByIdAndUpdate(req.params.todoId, __assign({}, req.body), {
//         new: true
//     })
//         .then(function (todo) {
//         if (!todo) {
//             res.status(404).json({
//                 message: 'Todo not found with id ' + req.params.todoId
//             });
//             return;
//         }
//         res.status(200).json(todo);
//     })
//         .catch(function (err) {
//         if (err.kind === 'ObjectId') {
//             res.status(404).json({
//                 message: 'Todo not found with id: ' + req.params.todoId,
//                 error: err
//             });
//             return;
//         }
//         res.status(500).json({
//             message: 'Error updating todo with id: ' + req.params.todoId,
//             error: err
//         });
//     });
// });
// // Delete Endpoint.
// router.delete('/todo/:todoId', function (req, res) {
//     Todo.findByIdAndRemove(req.params.todoId) //Returns the updated document.
//         .then(function (todo) {
//         if (!todo) {
//             res.status(404).json({
//                 message: 'Todo not found with id: ' + req.params.todoId
//             });
//             return;
//         }
//         res.status(200).json({
//             message: 'Todo deleted successfully',
//             todo: todo
//         });
//     })
//         .catch(function (err) {
//         if (err.kind === 'ObjectId' || err.name === 'NotFound') {
//             res.status(404).json({
//                 message: 'Todo not found with id: ' + req.params.todoId,
//                 error: err
//             });
//             return;
//         }
//         res.status(500).json({
//             message: 'Error deleting todo with id: ' + req.params.todoId,
//             error: err
//         });
//     });
// });
// module.exports = router;
