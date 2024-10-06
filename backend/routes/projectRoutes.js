const express = require('express');
const {
  createProject,
  getProjects,
  getProject,
  updateProjectTitle, // Import the update function
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
router.get('/:id', protect, getProject);
router.put('/:id', protect, updateProjectTitle); // Add PUT route for renaming the project
router.post('/:id/todos', protect, addTodo);

module.exports = router;
