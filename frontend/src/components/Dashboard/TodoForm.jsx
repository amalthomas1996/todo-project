import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoForm = ({ projectId, onTodoAdded, todoToEdit, setTodoToEdit }) => {
  const [description, setDescription] = useState("");
  //console.log("Project ID:", projectId);

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
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        placeholder="Todo description"
        className="border rounded px-2 py-1"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
      >
        {todoToEdit ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
