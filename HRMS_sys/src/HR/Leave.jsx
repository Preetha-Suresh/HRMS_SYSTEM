import React, { useEffect, useState } from "react";
import "./Leave.css";
import { getLeaves, updateLeaveStatus, fetchEmployees } from "../api";

const Leave = () => {
  const getCurrentDate = () => new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [employees, leaves] = await Promise.all([
        fetchEmployees(),
        getLeaves()
      ]);

      setLeaveRequests(leaves.filter((l) => l.status === "Pending"));

      const attendanceToday = employees.map((emp) => {
        const leaveToday = leaves.find(
          (l) => l.employeeId === emp.id && l.leaveDate === selectedDate
        );

        const status = leaveToday
          ? leaveToday.status === "Approved" ? "Absent" : "Pending"
          : "Present";

        return {
          name: emp.name,
          id: emp.id,
          date: selectedDate,
          status,
          checkIn: status === "Present" ? "09:00 AM" : "-",
          checkOut: status === "Present" ? "06:00 PM" : "-"
        };
      });

      setAttendanceData(attendanceToday);
    };

    fetchData();
  }, [selectedDate]);

  const handleDecision = async (leave, decision) => {
    const updatedLeave = {
      ...leave,
      status: decision === "approve" ? "Approved" : "Rejected"
    };
    await updateLeaveStatus(leave.id, updatedLeave);

    // Refresh UI
    setLeaveRequests((prev) => prev.filter((l) => l.id !== leave.id));
    setAttendanceData((prev) =>
      prev.map((emp) =>
        emp.id === leave.employeeId && emp.date === leave.leaveDate
          ? {
              ...emp,
              status: updatedLeave.status === "Approved" ? "Absent" : "Pending",
              checkIn: updatedLeave.status === "Approved" ? "09:00 AM" : "-",
              checkOut: updatedLeave.status === "Approved" ? "06:00 PM" : "-"
            }
          : emp
      )
    );
  };

  return (
    <div className="leave-container">
      <div className="leave-header">
        <h2>Leave & Attendance</h2>
        <p>Track employee attendance and manage leave requests</p>
      </div>

      <div className="leave-tabs">
        <button className="active-tab">Attendance</button>
        <button onClick={() => setShowPopup(true)}>Leave Requests</button>
      </div>

      <div className="attendance-section">
        <div className="attendance-title">
          <h3>Daily Attendance - Today</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((emp, idx) => (
              <tr key={idx}>
                <td>
                  <div className="avatar-text">
                    <div className="avatar"></div> {emp.name} ({emp.id})
                  </div>
                </td>
                <td>{emp.date}</td>
                <td>{emp.checkIn}</td>
                <td>{emp.checkOut}</td>
                <td>
                  <span className={`status-badge ${emp.status.toLowerCase()}`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="leave-popup">
          <div className="popup-content">
            <h3>Leave Requests</h3>
            {leaveRequests.length > 0 ? (
              leaveRequests.map((req, idx) => (
                <div key={idx} className="request-row">
                  <p>{req.employeeId} - {req.leaveDate}</p>
                  <div className="btns">
                    <button onClick={() => handleDecision(req, "approve")}>
                      Approve
                    </button>
                    <button onClick={() => handleDecision(req, "deny")}>
                      Deny
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No pending requests.</p>
            )}
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
