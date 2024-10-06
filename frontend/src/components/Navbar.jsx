import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if the token exists (i.e., user is logged in)

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    navigate("/"); // Redirect to the login page after logout
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          to="#"
          className="text-2xl font-bold text-white hover:text-blue-300"
        >
          My To-Do App
        </Link>
        {token ? (
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/projectlist"
                className="hover:text-blue-300 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-blue-300 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
