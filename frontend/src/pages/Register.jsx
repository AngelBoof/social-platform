// frontend/src/pages/Register.jsx
// ------------------------------------------------------
// A registration form that POSTs to /api/auth/register. On success,
// store token in localStorage and redirect to /feed.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        throw new Error("Registration failed");
      }
      const body = await res.json();
      // Expecting { id, name, email, createdAt, updatedAt } on success
      // (or maybe also a token, depending on your backend). If your backend
      // only returns the user and no token, you might have to call /login next.
      // For now let’s assume the backend returns { id, name, email, token }.
      // If your backend does not send back a token on register, you can either
      // request token = registerAndLogin or immediately POST to /api/auth/login.

      // If your backend returned a `token` here, save it:
      if (body.token) {
        localStorage.setItem("token", body.token);
        navigate("/feed");
      } else {
        // If no token was returned, we automatically log in:
        const loginRes = await fetch(`${API_BASE}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!loginRes.ok) throw new Error("Auto‐login failed");
        const loginBody = await loginRes.json();
        localStorage.setItem("token", loginBody.token);
        navigate("/feed");
      }
    } catch (err) {
      console.error(err);
      setError("Register failed");
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>
        </div>
        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
