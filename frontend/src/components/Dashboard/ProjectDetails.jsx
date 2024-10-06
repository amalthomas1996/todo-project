import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TodoForm from "./TodoForm";
import fileDownload from "js-file-download";

const ProjectDetails = () => {
  const { projectId } = useParams();
  console.log("Project ID:", projectId);
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");
  const [todoToEdit, setTodoToEdit] = useState(null);

  const fetchProjectDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token if stored in localStorage
      const response = await axios.get(
        `http://localhost:5000/api/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        }
      );
      setProject(response.data);
    } catch (error) {
      console.error(
        "Error fetching project details:",
        error.response ? error.response.data : error.message
      );
      setError("Error fetching project details");
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  const handleTodoAdded = () => {
    fetchProjectDetails(); // Refresh the project details after adding/updating a todo
  };

  const handleEditTodo = (todo) => {
    setTodoToEdit(todo);
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const token = localStorage.getItem("token");
      // Corrected API URL to include projectId
      await axios.delete(
        `http://localhost:5000/api/projects/${projectId}/todos/${todoId}`, // Correct URL
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authorization
          },
        }
      );
      fetchProjectDetails(); // Refresh the project details after deletion
    } catch (error) {
      console.error("Failed to delete todo", error);
      setError("Failed to delete todo");
    }
  };

  const handleToggleStatus = async (todo) => {
    console.log("Toggling status for todo ID:", todo._id); // Log the ID
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/projects/${projectId}/todos/${todo._id}`, // Correct URL
        { status: !todo.status }, // Toggle status
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authorization
          },
        }
      );
      fetchProjectDetails(); // Refresh the project details after toggling status
    } catch (error) {
      console.error("Error updating todo status:", error); // Log the error for better debugging
      setError("Failed to update todo status");
    }
  };

  const handleExport = async () => {
    const markdownContent = `# ${project.title}\n\n## Todos\n\n${project.todos
      .map(
        (todo) =>
          `- ${todo.description} [${todo.status ? "Completed" : "Pending"}]`
      )
      .join("\n")}`;

    // Download as markdown file
    fileDownload(markdownContent, `${project.title}_summary.md`);
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {project ? (
        <>
          <h2 className="text-2xl font-bold mb-5">{project.title}</h2>

          <TodoForm
            projectId={projectId}
            onTodoAdded={handleTodoAdded}
            todoToEdit={todoToEdit}
            setTodoToEdit={setTodoToEdit}
          />

          <button
            onClick={handleExport}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Export Project Summary
          </button>

          <h3 className="text-xl mt-5">Todos:</h3>
          <ul>
            {project.todos.map((todo) => (
              <li
                key={todo._id}
                className="flex justify-between items-center mb-2"
              >
                <span
                  className={`cursor-pointer ${
                    todo.status ? "line-through" : ""
                  }`}
                >
                  {todo.description}
                </span>
                <span className="flex space-x-2">
                  <button
                    onClick={() => handleEditTodo(todo)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  {/* Added a button to mark as completed */}
                  <button
                    onClick={() => handleToggleStatus(todo)}
                    className={`${
                      todo.status ? "bg-gray-300" : "bg-blue-500"
                    } text-white px-2 py-1 rounded`}
                    disabled={false} // Enable the button to allow toggling back to Pending
                  >
                    {todo.status ? "Mark as Pending" : "Mark as Completed"}
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProjectDetails;
