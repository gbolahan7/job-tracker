// src/pages/Register.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form.name, form.email, form.password);
      nav("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "30px auto" }}>
      <h2>Register</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <input name="name" value={form.name} onChange={handle} placeholder="Full name" required />
        <input name="email" value={form.email} onChange={handle} placeholder="Email" required type="email" />
        <input name="password" value={form.password} onChange={handle} placeholder="Password" required type="password" />
        <button type="submit">Create account</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
      <div style={{ marginTop: 10 }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
