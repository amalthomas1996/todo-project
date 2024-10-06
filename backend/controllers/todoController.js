const Project = require('../models/Project');

// Create a new todo within a project
exports.addTodo = async (req, res) => {
  const { description } = req.body;
  const { id: projectId } = req.params; // Get projectId from URL parameters

  if (!description) {
    return res.status(400).json({ message: "Description is required." });
  }

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const newTodo = { description, status: false }; // Default todo status is 'false'
    project.todos.push(newTodo); // Add new todo to the project
    await project.save();

    res.status(201).json({ message: "Todo added successfully.", todo: newTodo });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Server error while creating todo." });
  }
};

// Update an existing todo within a project
exports.updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { description, status } = req.body;

  try {
    const project = await Project.findOne({ "todos._id": todoId });

    if (!project) {
      return res.status(404).json({ message: "Todo not found." });
    }

    const todo = project.todos.id(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    // Update the todo fields
    todo.description = description !== undefined ? description : todo.description;
    todo.status = status !== undefined ? status : todo.status;

    await project.save();
    res.status(200).json({ message: "Todo updated successfully.", todo });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Server error while updating todo." });
  }
};
// Delete a todo from a project
exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    console.log("TodoId received: ", todoId); // Log todoId for debugging

    const project = await Project.findOne({ "todos._id": todoId });

    if (!project) {
      console.log("No project found with this todoId.");
      return res.status(404).json({ message: "Project or Todo not found." });
    }

    console.log("Project found: ", project.title); // Log project

    // Use the `id` method to find the todo and remove it
    const todo = project.todos.id(todoId);
    if (!todo) {
      console.log("No todo found with this todoId.");
      return res.status(404).json({ message: "Todo not found." });
    }

    // Directly remove the todo from the project's todos array
    project.todos.pull(todoId); // Correctly remove the todo by its ID

    // Attempt to save the project after removing the todo
    await project.save();

    console.log("Todo deleted successfully.");
    res.status(200).json({ message: "Todo deleted successfully." });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res.status(500).json({ message: "Error deleting todo.", error: error.message });
  }
};
