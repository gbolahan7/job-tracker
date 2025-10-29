// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid #e6e6e6" }}>
      <div>
        <Link to="/" style={{ textDecoration: "none", color: "#333", fontWeight: 700 }}>JobTracker</Link>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {user ? (
          <>
            <span style={{ color: "#555" }}>Hi, {user.name}</span>
            <Link to="/add" style={{ textDecoration: "none", padding: "6px 10px", border: "1px solid #ddd", borderRadius: 4 }}>Add Job</Link>
            <button onClick={handleLogout} style={{ padding: "6px 10px" }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: "none" }}>Login</Link>
            <Link to="/register" style={{ textDecoration: "none" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
