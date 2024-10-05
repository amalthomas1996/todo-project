import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TodoForm from "./TodoForm";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");
  const [todoToEdit, setTodoToEdit] = useState(null);

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/projects/${projectId}`
      );
      setProject(response.data);
    } catch (error) {
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
      await axios.delete(`http://localhost:5000/api/todos/${todoId}`);
      fetchProjectDetails(); // Refresh the project details after deletion
    } catch (error) {
      setError("Failed to delete todo");
    }
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
          <h3 className="text-xl mt-5">Todos:</h3>
          <ul>
            {project.todos.map((todo) => (
              <li
                key={todo._id}
                className="flex justify-between items-center mb-2"
              >
                <span>{todo.description}</span>
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
                  <span>{todo.status ? "Completed" : "Pending"}</span>
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
