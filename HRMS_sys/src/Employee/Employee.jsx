import React, { useState, useEffect } from "react";
import "./Employee.css";
import { applyLeave, getPayslips, getLeaves } from "../api";

const Employee = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const [availableLeaves] = useState(10);
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [payslip, setPayslip] = useState([]);
  const [myLeaves, setMyLeaves] = useState([]);

    useEffect(() => {
    const fetchMyData = async () => {
      try {
        console.log("User object:", user);

        const allPayslips = await getPayslips();
        const myPayslips = allPayslips.filter(p => p.employeeId === user.employeeId);
        setPayslip(myPayslips);

        const allLeaves = await getLeaves();
        const myLeaveRequests = allLeaves.filter(l => l.employeeId === user.employeeId);
        setMyLeaves(myLeaveRequests);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchMyData();
  }, [user.employeeId]);


  const handleLeaveApply = async () => {
    if (!leaveDate || !leaveReason) {
      alert("Please fill both date and reason.");
      return;
    }

    try {
      await applyLeave({
        employeeId: user.employeeId, // match with HR dashboard
        leaveDate,
        reason: leaveReason,
        status: "Pending",
      });
      
      alert("Leave request submitted!");
      setLeaveDate("");
      setLeaveReason("");

      // Refresh leave list
      const updatedLeaves = await getLeaves();
      const mine = updatedLeaves.filter(
        (l) => l.employeeId === user.id || l.employeeId === user.username
      );
      setMyLeaves(mine);
    } catch (err) {
      alert("Failed to submit leave request");
    }
  };

  return (
    <div className="employee-dashboard">
      <h2 className="dashboard-title">Employee Self-Service Portal</h2>

      <div className="card-grid">
        {/* Profile Card */}
        <div className="card">
          <h3>My Profile</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Contact:</strong> {user.contact}</p>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("loggedInUser");
              alert("Logged out successfully.");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>

        {/* Payslip Card */}
        <div className="card">
          <h3>Payslip</h3>
          {payslip.length === 0 ? (
            <p>No payslip available for you yet.</p>
          ) : (
            payslip.map((p, idx) => (
              <div className="payslip-block" key={idx}>
                <div><strong>ID:</strong> {p.id}</div>
                <div><strong>Basic:</strong> ${p.basic}</div>
                <div><strong>Allowance:</strong> ${p.allowance}</div>
                <div><strong>Deductions:</strong> ${p.deduction}</div>
                <div><strong>Net Pay:</strong> ${(p.basic + p.allowance - p.deduction).toFixed(2)}</div>
                <div><strong>Status:</strong> <span className="status paid">{p.status}</span></div>
              </div>
            ))
          )}
        </div>

        {/* Leave Application */}
        <div className="card">
          <h3>Leave Application</h3>
          <p><strong>Available Days:</strong> {availableLeaves}</p>

          <label>Date of Leave:</label>
          <input
            type="date"
            className="input"
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
          />

          <label>Reason:</label>
          <textarea
            className="input"
            placeholder="Reason for leave..."
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
          />

          <button className="primary-btn" onClick={handleLeaveApply}>
            Apply for Leave
          </button>

          <h4>My Leave Requests</h4>
          {myLeaves.length === 0 ? (
            <p>No leave requests submitted yet.</p>
          ) : (
            <table className="leave-history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myLeaves.map((l, i) => (
                  <tr key={i}>
                    <td>{l.leaveDate}</td>
                    <td>{l.reason}</td>
                    <td>
                      <span className={`status ${l.status.toLowerCase()}`}>
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;
