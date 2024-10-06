import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TodoForm from "./TodoForm";
import fileDownload from "js-file-download";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [githubToken, setGithubToken] = useState(""); // State to hold GitHub token

  const fetchProjectDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token if stored in localStorage
      const response = await axios.get(
        `http://localhost:5000/api/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      await axios.delete(
        `http://localhost:5000/api/projects/${projectId}/todos/${todoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchProjectDetails();
    } catch (error) {
      console.error("Failed to delete todo", error);
      setError("Failed to delete todo");
    }
  };

  const handleToggleStatus = async (todo) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/projects/${projectId}/todos/${todo._id}`,
        { status: !todo.status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchProjectDetails();
    } catch (error) {
      console.error("Error updating todo status:", error);
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

    fileDownload(markdownContent, `${project.title}_summary.md`);
  };

  const handleExportGist = async () => {
    if (!project || !githubToken) return; // Check if project and token are available

    const completedTodos = project.todos.filter((todo) => todo.status);
    const pendingTodos = project.todos.filter((todo) => !todo.status);

    const markdownContent = `# ${project.title}\n\n## Summary\n${
      completedTodos.length
    } / ${project.todos.length} completed.\n\n### Pending Todos\n${pendingTodos
      .map((todo) => `- [ ] ${todo.description}`)
      .join("\n")}\n\n### Completed Todos\n${completedTodos
      .map((todo) => `- [x] ${todo.description}`)
      .join("\n")}`;

    const gistData = {
      description: `${project.title} Summary`,
      files: {
        [`${project.title}.md`]: {
          content: markdownContent,
        },
      },
      public: false, // This makes it a secret gist
    };

    try {
      await axios.post("https://api.github.com/gists", gistData, {
        headers: {
          Authorization: `token ${githubToken}`, // Use the inputted GitHub token
        },
      });
      alert("Gist created successfully!");
    } catch (error) {
      console.error("Error creating gist:", error);
      setError("Failed to create gist");
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      {project ? (
        <>
          <h2 className="text-3xl font-bold mb-5 text-gray-800">
            Project Name: {project.title}
          </h2>

          <TodoForm
            projectId={projectId}
            onTodoAdded={handleTodoAdded}
            todoToEdit={todoToEdit}
            setTodoToEdit={setTodoToEdit}
          />

          <h3 className="text-2xl mt-5 font-semibold text-gray-700">Todos:</h3>
          <ul className="mt-4">
            {project.todos.map((todo) => (
              <li
                key={todo._id}
                className={`flex justify-between items-center mb-3 p-3 rounded-lg shadow-sm transition ${
                  todo.status ? "bg-red-200" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <span
                  className={`cursor-pointer text-lg ${
                    todo.status ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {todo.description}
                </span>
                <span className="flex space-x-2">
                  <button
                    onClick={() => handleEditTodo(todo)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleToggleStatus(todo)}
                    className={`${
                      todo.status ? "bg-gray-300" : "bg-blue-500"
                    } text-white min-w-[200px] px-3 py-1 rounded hover:bg-blue-600 transition`}
                  >
                    {todo.status ? "Mark as Pending" : "Mark as Completed"}
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleExport}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 transition"
          >
            Export Project Summary
          </button>
          {/* Input for GitHub token */}
          <div className="mb-4 mt-6">
            <label className="block mb-1 font-semibold" htmlFor="githubToken">
              Enter GitHub Token:
            </label>
            <input
              type="text"
              id="githubToken"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your GitHub token"
            />
          </div>
          <button
            onClick={handleExportGist}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Export as Gist
          </button>
        </>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default ProjectDetails;
