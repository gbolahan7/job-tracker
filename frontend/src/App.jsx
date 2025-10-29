// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddEditJob from "./pages/AddEditJob";
import { AuthContext } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  if (!token) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: 1000, margin: "20px auto", padding: "0 16px" }}>
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><AddEditJob /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><AddEditJob /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}
