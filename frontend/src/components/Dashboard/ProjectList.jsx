import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token"); // or however you're storing the token

      const response = await axios.get("http://localhost:5000/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      setError("Error fetching projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">Projects</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <Link
        to="/create-project"
        className="bg-green-500 text-white px-4 py-2 rounded mt-5 inline-block hover:bg-green-600 transition duration-200"
      >
        Create New Project
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200 bg-gray-50"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-1">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Created on: {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Link
                to={`/project/${project._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200 self-start"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
