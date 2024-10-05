const express = require('express');
const { createProject, getProjects, getProject } = require('../controllers/projectController');
const router = express.Router();

router.post('/', createProject); // Create a new project
router.get('/', getProjects); // Get all projects
router.get('/:id', getProject); // Get a specific project

module.exports = router;
