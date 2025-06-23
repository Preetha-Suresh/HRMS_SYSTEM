import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user || user.role !== "HR") return null;

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("Logging out...");
    navigate("/login");
  };

  return (
    <div className="sidebar m-2 position-fixed">
      <div className="sidebar-header">
        <h2>HRMS</h2>
        <p>Management System</p>
      </div>

      <div className="sidebar-menu d-flex flex-column gap-2">
        <NavLink to="/dashboard" className="sidebar-link">
          <i className="bi bi-speedometer2"></i> Dashboard
        </NavLink>
        <NavLink to="/leave" className="sidebar-link">
          <i className="bi bi-calendar-check"></i> Leave & Attendance
        </NavLink>
        <NavLink to="/payroll" className="sidebar-link">
          <i className="bi bi-cash-stack"></i> Payroll
        </NavLink>
        <NavLink to="/recruitment" className="sidebar-link">
          <i className="bi bi-briefcase-fill"></i> Recruitment & Onboarding
        </NavLink>
      </div>

      <div className="position-fixed bottom-0 d-flex flex-column gap-3 mb-5">
        <div className="sidebar-footer">
          <div className="sidebar-link" onClick={handleLogout} style={{ cursor: "pointer" }}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
