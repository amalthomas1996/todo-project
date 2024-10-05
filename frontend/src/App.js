import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ProjectList from './components/Dashboard/ProjectList';
import ProjectDetails from './components/Dashboard/ProjectDetails';
import CreateProject from './components/Dashboard/CreateProject';
import Logout from './components/Auth/Logout';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/" element={<h2 className="text-center mt-10">Welcome to the To-Do App</h2>} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
