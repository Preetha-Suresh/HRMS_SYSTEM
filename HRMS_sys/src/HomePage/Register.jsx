import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegLogin.css';
import { registerUser } from "../api"; 

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    contact: "",
    role: "",
    department: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  };

  const handleRegister = async () => {
    if (
      !form.name ||
      !form.username ||
      !form.password ||
      !form.role ||
      !form.department
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await registerUser(form); 
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Registration failed.");
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="username"
        placeholder="Email / Username"
        value={form.username}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <input
        name="contact"
        placeholder="Contact No"
        value={form.contact}
        onChange={handleChange}
      />

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="">Select Role</option>
        <option value="HR">HR</option>
        <option value="Employee">Employee</option>
      </select>

      <select name="department" value={form.department} onChange={handleChange}>
        <option value="">Select Department</option>
        <option value="Development">Development</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="Human Resources">Human Resources</option>
        <option value="Finance">Finance</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
