import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects"); // Update this URL based on your API
      setProjects(response.data);
    } catch (error) {
      setError("Error fetching projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Projects</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <ul>
        {projects.map((project) => (
          <li key={project._id} className="mb-2">
            <Link
              to={`/project/${project._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/create-project"
        className="bg-green-500 text-white px-4 py-2 rounded mt-5 inline-block"
      >
        Create New Project
      </Link>
    </div>
  );
};

export default ProjectList;
