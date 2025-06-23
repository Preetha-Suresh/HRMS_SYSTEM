import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegLogin.css';
import { loginUser, fetchEmployees } from "../api";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.username || !form.password || !form.role) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const user = await loginUser({
        username: form.username,
        password: form.password,
      });

      if (user.role.toLowerCase() !== form.role.toLowerCase()) {
        alert("Role mismatch. Please choose the correct role.");
        return;
      }

      const allEmployees = await fetchEmployees();

      const matched = allEmployees.find(
        (emp) =>
          emp.email.toLowerCase() === user.username.toLowerCase() ||
          emp.username?.toLowerCase() === user.username.toLowerCase()
      );

      const fullUser = {
        name: user.name,
        username: user.username,
        role: user.role,
        department: matched?.department || "",
        contact: matched?.phone || "",
        employeeId: matched?.employeeId || matched?.id || "", 
      };

      localStorage.setItem("loggedInUser", JSON.stringify(fullUser));
      alert("Login successful!");

      navigate(user.role.toLowerCase() === "hr" ? "/dashboard" : "/employee");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };


  return (
    <div className="form-container">
      <h2>Login</h2>
      <input
        name="username"
        placeholder="Username"
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
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="">Select Role</option>
        <option value="hr">HR</option>
        <option value="employee">Employee</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
