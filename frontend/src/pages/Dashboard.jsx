// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import JobCard from "../components/JobCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState({ q: "", status: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs((s) => s.filter((j) => j._id !== id));
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const filtered = jobs.filter((j) => {
    const q = filter.q.trim().toLowerCase();
    if (filter.status && j.status !== filter.status) return false;
    if (!q) return true;
    return j.company.toLowerCase().includes(q) || j.position.toLowerCase().includes(q);
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2>Your Applications</h2>
        <Link to="/add" style={{ textDecoration: "none", padding: "8px 12px", border: "1px solid #ddd" }}>Add Job</Link>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input placeholder="Search company or position" value={filter.q} onChange={(e) => setFilter({ ...filter, q: e.target.value })} />
        <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
          <option value="">All statuses</option>
          <option value="applied">applied</option>
          <option value="interview">interview</option>
          <option value="offer">offer</option>
          <option value="rejected">rejected</option>
        </select>
        <button onClick={() => { setFilter({ q: "", status: "" }); }}>Reset</button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && filtered.length === 0 && <div>No jobs found</div>}

      {filtered.map((job) => (
        <JobCard key={job._id} job={job} onDelete={handleDelete} />
      ))}
    </div>
  );
}
