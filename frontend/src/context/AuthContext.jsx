// src/context/AuthContext.jsx

/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const register = async (name, email, password) => {
    setLoading(true);
    const res = await api.post("/auth/register", { name, email, password });
    setUser({ name: res.data.name, email: res.data.email, _id: res.data._id });
    setToken(res.data.token);
    setLoading(false);
    return res;
  };

  const login = async (email, password) => {
    setLoading(true);
    const res = await api.post("/auth/login", { email, password });
    setUser({ name: res.data.name, email: res.data.email, _id: res.data._id });
    setToken(res.data.token);
    setLoading(false);
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
