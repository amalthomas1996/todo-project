const express = require('express');
const { addTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router({ mergeParams: true });

router.post('/:id/todos', protect, addTodo);
router.put('/:todoId', protect, updateTodo);
router.delete('/:todoId', protect, deleteTodo);

module.exports = router;
