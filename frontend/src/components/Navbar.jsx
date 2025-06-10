// frontend/src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav style={{ padding: "1rem", background: "#333", color: "#fff" }}>
      <span
        style={{ marginRight: "1rem", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        MySocialApp
      </span>

      {token ? (
        <>
          <button
            onClick={() => navigate("/feed")}
            style={{ marginRight: "0.5rem" }}
          >
            Feed
          </button>
          <button onClick={handleLogout} style={{ marginRight: "0.5rem" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => navigate("/login")}
            style={{ marginRight: "0.5rem" }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            style={{ marginRight: "0.5rem" }}
          >
            Register
          </button>
        </>
      )}
    </nav>
  );
}
