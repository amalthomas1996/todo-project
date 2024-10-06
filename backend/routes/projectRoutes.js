const express = require('express');
const {
  createProject,
  getProjects,
  getProject
} = require('../controllers/projectController');
const {
  addTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createProject);
router.get('/', protect, getProjects);
router.get('/:id', protect, getProject); // Protect this route
router.post('/:id/todos', protect, addTodo); // Route to add todo


module.exports = router;
