import Content from './HR/Content';
import Sidebar from './Sidebar';
import './App.css';
import Leave from './HR/Leave';
import Pay from './HR/Pay';
import Recruitment from './HR/Recruitment';
import Home from './HomePage/Home';
import Login from './HomePage/Login';
import Register from './HomePage/Register';
import Employee from './Employee/Employee';

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();

  const hideSidebarRoutes = ["/home", "/login", "/register", "/employee"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="d-flex">
      {!shouldHideSidebar && <Sidebar />}
      <div className="content-area">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Content />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payroll" element={<Pay />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
