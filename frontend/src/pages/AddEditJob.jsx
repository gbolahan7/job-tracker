// src/pages/AddEditJob.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function AddEditJob() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ company: "", position: "", status: "applied", notes: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchJob = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await api.get("/jobs");
      const job = res.data.find((j) => j._id === id);
      if (!job) {
        setError("Job not found");
      } else {
        setForm({ company: job.company, position: job.position, status: job.status, notes: job.notes || "" });
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to load job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line
  }, [id]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (id) {
        await api.put(`/jobs/${id}`, form);
      } else {
        await api.post("/jobs", form);
      }
      nav("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save job");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>{id ? "Edit Job" : "Add Job"}</h2>
      {loading && <div>Loading...</div>}
      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <input name="company" value={form.company} onChange={handle} placeholder="Company" required />
        <input name="position" value={form.position} onChange={handle} placeholder="Position" required />
        <select name="status" value={form.status} onChange={handle}>
          <option value="applied">applied</option>
          <option value="interview">interview</option>
          <option value="offer">offer</option>
          <option value="rejected">rejected</option>
        </select>
        <textarea name="notes" value={form.notes} onChange={handle} placeholder="Notes (optional)" rows={4} />
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">{id ? "Save changes" : "Add job"}</button>
          <button type="button" onClick={() => nav("/")}>Cancel</button>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
}
