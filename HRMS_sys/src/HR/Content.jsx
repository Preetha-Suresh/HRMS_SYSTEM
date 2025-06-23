import React, { useEffect, useState } from "react";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api";

import "./Content.css";

const Content = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");

  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    status: "Active",
  });

  const [editEmployee, setEditEmployee] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    status: "Active",
  });

  useEffect(() => {
    fetchEmployees().then(setEmployees);
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFilter = (e) => setFilterDept(e.target.value);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      filterDept === "All" || emp.department === filterDept;

    return matchesSearch && matchesDept;
  });

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const added = await addEmployee(newEmployee); 
    setEmployees((prev) => [...prev, added]);
    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      department: "",
      role: "",
      status: "Active",
    });
    setShowPopup(false);
  };

  const handleEditClick = (emp) => {
    setEditEmployee(emp);
    setShowEditPopup(true);
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    const updated = await updateEmployee(editEmployee.id, editEmployee);
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updated.id ? updated : emp))
    );
    setShowEditPopup(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="content-container">
      <h2>Employee Directory</h2>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={filterDept} onChange={handleFilter}>
          <option value="All">All Departments</option>
          <option value="Development">Development</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Finance">Finance</option>
        </select>
        <button onClick={() => setShowPopup(true)}>+ Add Employee</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              <td>{emp.status}</td>
              <td>
                <button onClick={() => handleEditClick(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Employee Popup */}
      {showPopup && (
        <div className="popup">
          <form onSubmit={handleAddEmployee}>
            <h3>Add Employee</h3>
            <input
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
              required
            />
            <input
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, email: e.target.value })
              }
              required
            />
            <input
              placeholder="Phone"
              value={newEmployee.phone}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, phone: e.target.value })
              }
              required
            />
            <input
              placeholder="Department"
              value={newEmployee.department}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, department: e.target.value })
              }
              required
            />
            <input
              placeholder="Role"
              value={newEmployee.role}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, role: e.target.value })
              }
              required
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Edit Employee Popup */}
      {showEditPopup && (
        <div className="popup">
          <form onSubmit={handleUpdateEmployee}>
            <h3>Edit Employee</h3>
            {["name", "email", "phone", "department", "role", "status"].map(
              (field) => (
                <input
                  key={field}
                  placeholder={field.toUpperCase()}
                  value={editEmployee[field]}
                  onChange={(e) =>
                    setEditEmployee({
                      ...editEmployee,
                      [field]: e.target.value,
                    })
                  }
                />
              )
            )}
            <button type="submit">Update</button>
            <button type="button" onClick={() => setShowEditPopup(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Content;
