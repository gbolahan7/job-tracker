// src/components/JobCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job, onDelete }) {
  return (
    <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 6, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ fontWeight: 700 }}>{job.position} <span style={{ fontWeight: 500, color: "#666" }}>@ {job.company}</span></div>
        <div style={{ fontSize: 13, color: "#666" }}>{job.status} • {new Date(job.createdAt).toLocaleDateString()}</div>
        {job.notes && <div style={{ marginTop: 8 }}>{job.notes}</div>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Link to={`/edit/${job._id}`} style={{ textDecoration: "none", padding: "6px 8px", border: "1px solid #ddd", borderRadius: 4 }}>Edit</Link>
        <button onClick={() => onDelete(job._id)} style={{ padding: "6px 8px" }}>Delete</button>
      </div>
    </div>
  );
}
