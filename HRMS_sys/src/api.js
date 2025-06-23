const API = "http://localhost:8080";

// AUTH

export const loginUser = async (data) => {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// EMPLOYEES

export const fetchEmployees = async () => {
  const res = await fetch(`${API}/api/employees`);
  return res.json();
};

export const addEmployee = async (employee) => {
  const res = await fetch(`${API}/api/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return res.json();
};

export const updateEmployee = async (id, employee) => {
  const res = await fetch(`${API}/api/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return res.json();
};

export const deleteEmployee = async (id) => {
  await fetch(`${API}/api/employees/${id}`, { method: "DELETE" });
};

// LEAVES

export const applyLeave = async (data) => {
  const res = await fetch(`${API}/api/leaves`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getLeaves = async () => {
  const res = await fetch(`${API}/api/leaves`);
  return res.json();
};

export const updateLeaveStatus = async (id, leave) => {
  const res = await fetch(`${API}/api/leaves/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leave),
  });
  return res.json();
};

// PAYROLL 

export const getPayslips = async () => {
  const res = await fetch(`${API}/api/payroll`);
  return res.json();
};

export const addPayslip = async (data) => {
  const res = await fetch(`${API}/api/payroll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updatePayslip = async (id, data) => {
  const res = await fetch(`${API}/api/payroll/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deletePayslip = async (id) => {
  await fetch(`${API}/api/payroll/${id}`, { method: "DELETE" });
};


// JOBS 

export const getJobs = async () => {
  const res = await fetch(`${API}/api/jobs`);
  return res.json();
};

export const addJob = async (job) => {
  const res = await fetch(`${API}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  return res.json();
};

export const updateJob = async (id, job) => {
  const res = await fetch(`${API}/api/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  return res.json();
};

export const deleteJob = async (id) => {
  await fetch(`${API}/api/jobs/${id}`, {
    method: "DELETE",
  });
};

// CANDIDATES 

export const getCandidates = async (jobId) => {
  const res = await fetch(`${API}/api/candidates/job/${jobId}`);
  return res.json();
};

export const addCandidate = async (candidate) => {
  const res = await fetch(`${API}/api/candidates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidate),
  });
  return res.json();
};
