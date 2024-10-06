import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error

    try {
      const token = localStorage.getItem("token"); // Get the token
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );
      navigate(`/project/${response.data._id}`); // Redirect to the new project
    } catch (error) {
      setError(
        "Failed to create project. " + (error.response?.data?.message || "")
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Create Project</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 px-4 py-2 mb-4 w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
