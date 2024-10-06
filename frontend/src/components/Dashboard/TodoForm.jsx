import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoForm = ({ projectId, onTodoAdded, todoToEdit, setTodoToEdit }) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (todoToEdit) {
      setDescription(todoToEdit.description);
    } else {
      setDescription("");
    }
  }, [todoToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Get the token from localStorage
    const headers = {
      Authorization: `Bearer ${token}`, // Add token to headers
    };

    try {
      if (todoToEdit) {
        // Update existing todo
        await axios.put(
          `http://localhost:5000/api/projects/${projectId}/todos/${todoToEdit._id}`,
          {
            description,
          },
          { headers } // Pass the headers with token
        );
      } else {
        // Create new todo
        await axios.post(
          `http://localhost:5000/api/projects/${projectId}/todos`,
          {
            description,
          },
          { headers } // Pass the headers with token
        );
      }
      setDescription("");
      setTodoToEdit(null);
      onTodoAdded(); // Refresh the project details
    } catch (error) {
      console.error("Failed to create or update todo", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex items-center">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        placeholder="Todo description"
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-700 transition duration-200 ease-in-out"
      >
        {todoToEdit ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
