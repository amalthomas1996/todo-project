const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required." });
  }

  try {
    const newProject = new Project({
      title,
      user: req.user.id, // Associate the project with the logged-in user
      createdAt: new Date(),
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Error creating project." });
  }
};

// Get all projects for the current user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).populate('todos');
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects." });
  }
};

// Get a specific project by ID
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('todos');
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(200).json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ message: "Error fetching project." });
  }
};
