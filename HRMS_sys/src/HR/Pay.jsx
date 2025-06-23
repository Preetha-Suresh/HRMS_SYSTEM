import React, { useState, useEffect } from "react";
import "./pay.css";
import {
  getPayslips,
  updatePayslip,
  deletePayslip,
  addPayslip,
  fetchEmployees,
} from "../api";

const Pay = () => {
  const getCurrentMonth = () => new Date().toISOString().slice(0, 7);

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [payrollData, setPayrollData] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newPayroll, setNewPayroll] = useState({
    employeeId: "",
    month: getCurrentMonth(),
    basic: 0,
    allowance: 0,
    deduction: 0,
    status: "Pending",
  });

  const getNetPay = (basic, allowance, deduction) =>
    basic + allowance - deduction;

  useEffect(() => {
    getPayslips().then(setPayrollData);
    fetchEmployees().then(setEmployees);

    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-cell")) setActionMenuOpen(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this employee payroll?")
    ) {
      await deletePayslip(id);
      setPayrollData((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updated = await updatePayslip(selectedEmployee.id, selectedEmployee);
    setPayrollData((prev) =>
      prev.map((emp) => (emp.id === updated.id ? updated : emp))
    );
    setShowEditPopup(false);
    console.log("Updating payroll:", selectedEmployee);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const added = await addPayslip(newPayroll);
    setPayrollData((prev) => [...prev, added]);
    setShowAddPopup(false);
    setNewPayroll({
      employeeId: "",
      month: getCurrentMonth(),
      basic: 0,
      allowance: 0,
      deduction: 0,
      status: "Pending",
    });
    console.log("Saving payroll:", newPayroll); 
  };

  const filteredData = payrollData.filter(
    (emp) => emp.month === selectedMonth
  );

  const summary = {
    total: filteredData.reduce(
      (sum, e) => sum + getNetPay(e.basic, e.allowance, e.deduction),
      0
    ),
    paid: filteredData.filter((e) => e.status === "Paid").length,
    pending: filteredData.filter((e) => e.status === "Pending").length,
    processing: filteredData.filter((e) => e.status === "Processing").length,
  };

  return (
    <div className="payroll-container">
      <div className="payroll-header">
        <h2>Payroll Management</h2>
        <p>Process employee salaries and view payroll status</p>
      </div>

      <div className="payroll-summary">
        <div className="summary-box blue">
          <h3>${summary.total.toFixed(2)}</h3>
          <p>Total Payroll</p>
        </div>
        <div className="summary-box green">
          <h3>{summary.paid}</h3>
          <p>Paid Employees</p>
        </div>
        <div className="summary-box yellow">
          <h3>{summary.pending}</h3>
          <p>Pending Payments</p>
        </div>
        <div className="summary-box sky">
          <h3>{summary.processing}</h3>
          <p>Processing</p>
        </div>
      </div>

      <div className="payroll-table-wrapper">
        <div className="payroll-table-header">
          <h4>Payroll Details</h4>
          <div className="d-flex gap-2">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
            <button onClick={() => setShowAddPopup(true)}>+ Add Payroll</button>
          </div>
        </div>

        <table className="payroll-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>ID</th>
              <th>Basic</th>
              <th>Allowance</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <div className="avatar-text">{emp.employeeId}</div>
                </td>
                <td>{emp.id}</td>
                <td>${emp.basic}</td>
                <td>${emp.allowance}</td>
                <td>${emp.deduction}</td>
                <td>
                  <strong>
                    ${getNetPay(emp.basic, emp.allowance, emp.deduction)}
                  </strong>
                </td>
                <td>
                  <span className={`status-badge ${emp.status.toLowerCase()}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="action-cell">
                  <i
                    className="bi bi-three-dots-vertical"
                    onClick={() =>
                      setActionMenuOpen(
                        actionMenuOpen === emp.id ? null : emp.id
                      )
                    }
                    style={{ cursor: "pointer" }}
                  ></i>
                  {actionMenuOpen === emp.id && (
                    <div className="action-dropdown">
                      <button
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setShowEditPopup(true);
                          setActionMenuOpen(null);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          handleDelete(emp.id);
                          setActionMenuOpen(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Payroll Modal */}
      {showEditPopup && selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Payroll - {selectedEmployee.employeeId}</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="number"
                value={selectedEmployee.basic}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    basic: +e.target.value,
                  })
                }
              />
              <input
                type="number"
                value={selectedEmployee.allowance}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    allowance: +e.target.value,
                  })
                }
              />
              <input
                type="number"
                value={selectedEmployee.deduction}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    deduction: +e.target.value,
                  })
                }
              />
              <select
                value={selectedEmployee.status}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    status: e.target.value,
                  })
                }
              >
                <option>Paid</option>
                <option>Pending</option>
                <option>Processing</option>
              </select>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setShowEditPopup(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Add Payroll Modal */}
      {showAddPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Payroll Entry</h2>
            <form onSubmit={handleAddSubmit}>
              <select
                value={newPayroll.employeeId}
                onChange={(e) =>
                  setNewPayroll({ ...newPayroll, employeeId: e.target.value })
                }
                required
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.employeeId}>
                    {emp.name} ({emp.employeeId})
                  </option>
                ))}
              </select>

              <input
                type="month"
                value={newPayroll.month}
                onChange={(e) =>
                  setNewPayroll({ ...newPayroll, month: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Basic"
                value={newPayroll.basic}
                onChange={(e) =>
                  setNewPayroll({ ...newPayroll, basic: +e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Allowance"
                value={newPayroll.allowance}
                onChange={(e) =>
                  setNewPayroll({ ...newPayroll, allowance: +e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Deduction"
                value={newPayroll.deduction}
                onChange={(e) =>
                  setNewPayroll({ ...newPayroll, deduction: +e.target.value })
                }
              />
              <select
                value={newPayroll.status}
                onChange={(e) =>
                  setNewPayroll({ ...newPayroll, status: e.target.value })
                }
              >
                <option>Paid</option>
                <option>Pending</option>
                <option>Processing</option>
              </select>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddPopup(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pay;
