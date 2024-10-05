const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
    const { title } = req.body;
    const newProject = new Project({ title, todos: [] });
    try {
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all projects for a user
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get a specific project
exports.getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json(err);
    }
};
