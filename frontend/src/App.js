import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ProjectList from './components/Dashboard/ProjectList';
import ProjectDetails from './components/Dashboard/ProjectDetails';
import CreateProject from './components/Dashboard/CreateProject';
import Logout from './components/Auth/Logout';
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/projectlist" element={<PrivateRoute><ProjectList /></PrivateRoute>} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
