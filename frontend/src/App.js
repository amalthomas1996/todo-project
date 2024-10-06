import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ProjectList from './components/Dashboard/ProjectList';
import ProjectDetails from './components/Dashboard/ProjectDetails';
import CreateProject from './components/Dashboard/CreateProject';
import Logout from './components/Auth/Logout';
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is authenticated

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Redirect to login if not authenticated */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/project/:projectId" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
          <Route path="/projectlist" element={<PrivateRoute><ProjectList /></PrivateRoute>} />
          <Route path="/create-project" element={<PrivateRoute><CreateProject /></PrivateRoute>} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
