// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      nav("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "30px auto" }}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <input name="email" value={form.email} onChange={handle} placeholder="Email" required />
        <input name="password" value={form.password} onChange={handle} placeholder="Password" required type="password" />
        <button type="submit">Login</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
      <div style={{ marginTop: 10 }}>
        Need an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
