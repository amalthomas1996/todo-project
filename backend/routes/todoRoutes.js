const express = require('express');
const { addTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router({ mergeParams: true });

router.post('/:id/todos', protect, addTodo);  // Create a new todo
router.put('/:todoId', protect, updateTodo); // Update a todo (description or status)
router.delete('/:todoId', protect, deleteTodo); // Delete a todo

module.exports = router;
