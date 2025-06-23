import React, { useEffect, useState } from "react";
import "./Recruitment.css";
import {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
  getCandidates,
  addCandidate,
} from "../api";

const Recruitment = () => {
  const [jobPositions, setJobPositions] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCandidatesPopup, setShowCandidatesPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const [newJob, setNewJob] = useState({
    position: "",
    department: "",
    location: "",
    type: "Full-time",
    posted: new Date().toISOString().slice(0, 10),
    status: "Active",
  });

  const [candidateForm, setCandidateForm] = useState({
    name: "",
    contact: "",
  });

  useEffect(() => {
    getJobs().then(setJobPositions);

    const closeMenus = (e) => {
      if (!e.target.closest(".action-cell")) {
        setActionMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", closeMenus);
    return () => document.removeEventListener("mousedown", closeMenus);
  }, []);

  const handleAddJob = async (e) => {
    e.preventDefault();
    const added = await addJob(newJob);
    setJobPositions((prev) => [...prev, added]);
    setShowAddPopup(false);
    setNewJob({
      position: "",
      department: "",
      location: "",
      type: "Full-time",
      posted: new Date().toISOString().slice(0, 10),
      status: "Active",
    });
  };

  const handleEditJob = async (e) => {
    e.preventDefault();
    const updated = await updateJob(selectedJob.id, selectedJob);
    setJobPositions((prev) =>
      prev.map((job) => (job.id === updated.id ? updated : job))
    );
    setShowEditPopup(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this job?")) {
      await deleteJob(id);
      setJobPositions((prev) => prev.filter((j) => j.id !== id));
    }
  };

  const handleViewCandidates = async (job) => {
    const list = await getCandidates(job.id);
    setSelectedJob(job);
    setCandidates(list);
    setShowCandidatesPopup(true);
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    const saved = await addCandidate({
      ...candidateForm,
      jobId: selectedJob.id,
    });
    setCandidates((prev) => [...prev, saved]);
    setCandidateForm({ name: "", contact: "" });
  };

  return (
    <div className="recruitment-container">
      <h2>Recruitment</h2>
      <button onClick={() => setShowAddPopup(true)}>+ Add Position</button>

      <table className="recruitment-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Department</th>
            <th>Location</th>
            <th>Type</th>
            <th>Posted</th>
            <th>Status</th>
            <th>Applicants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobPositions.map((job) => (
            <tr key={job.id}>
              <td>{job.position}</td>
              <td>{job.department}</td>
              <td>{job.location}</td>
              <td>{job.type}</td>
              <td>{job.posted}</td>
              <td>{job.status}</td>
              <td>
                <button onClick={() => handleViewCandidates(job)}>
                  View
                </button>
              </td>
              <td className="action-cell">
                <i
                  className="bi bi-three-dots-vertical"
                  onClick={() =>
                    setActionMenuOpen(actionMenuOpen === job.id ? null : job.id)
                  }
                ></i>
                {actionMenuOpen === job.id && (
                  <div className="action-dropdown">
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setShowEditPopup(true);
                        setActionMenuOpen(null);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(job.id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Job Popup */}
      {showAddPopup && (
        <div className="popup">
          <form onSubmit={handleAddJob}>
            <h3>Add New Job</h3>
            {["position", "department", "location", "type", "status"].map((f) => (
              <input
                key={f}
                placeholder={f.toUpperCase()}
                value={newJob[f]}
                onChange={(e) => setNewJob({ ...newJob, [f]: e.target.value })}
                required
              />
            ))}
            <button type="submit">Add</button>
            <button type="button" onClick={() => setShowAddPopup(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Edit Job Popup */}
      {showEditPopup && (
        <div className="popup">
          <form onSubmit={handleEditJob}>
            <h3>Edit Job</h3>
            {["position", "department", "location", "type", "status"].map((f) => (
              <input
                key={f}
                placeholder={f.toUpperCase()}
                value={selectedJob[f]}
                onChange={(e) =>
                  setSelectedJob({ ...selectedJob, [f]: e.target.value })
                }
                required
              />
            ))}
            <button type="submit">Update</button>
            <button type="button" onClick={() => setShowEditPopup(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Candidate Popup */}
      {showCandidatesPopup && (
        <div className="popup">
          <div>
            <h3>Candidates for {selectedJob.position}</h3>
            <form onSubmit={handleAddCandidate}>
              <input
                placeholder="Name"
                value={candidateForm.name}
                onChange={(e) =>
                  setCandidateForm({ ...candidateForm, name: e.target.value })
                }
                required
              />
              <input
                placeholder="Contact"
                value={candidateForm.contact}
                onChange={(e) =>
                  setCandidateForm({ ...candidateForm, contact: e.target.value })
                }
                required
              />
              <button type="submit">Add</button>
            </form>
            <ul>
              {candidates.map((c) => (
                <li key={c.id}>
                  {c.name} — {c.contact}
                </li>
              ))}
            </ul>
            <button onClick={() => setShowCandidatesPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recruitment;
