const express = require('express');
const { addTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const router = express.Router();

router.post('/', addTodo); // Add a new todo
router.put('/', updateTodo); // Update a todo
router.delete('/:projectId/:todoId', deleteTodo); // Delete a todo

module.exports = router;
