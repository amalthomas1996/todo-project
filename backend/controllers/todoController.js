const Project = require('../models/Project');

// Add a new todo to a project
exports.addTodo = async (req, res) => {
  const { projectId, description } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.todos.push({ description });
    const updatedProject = await project.save();
    res.status(201).json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a todo's status
exports.updateTodo = async (req, res) => {
  const { projectId, todoId, description, status } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const todo = project.todos.id(todoId);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.description = description || todo.description;
    todo.status = status !== undefined ? status : todo.status;
    todo.updatedAt = Date.now(); // Update the timestamp

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  const { projectId, todoId } = req.params;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const todo = project.todos.id(todoId);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.remove(); // Remove the todo
    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
  }
};
