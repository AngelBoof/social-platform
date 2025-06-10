// frontend/src/components/ProtectedRoute.jsx
// ------------------------------------------------------
// Wrap any route you only want visible when the user is
// logged in. We check for a token in localStorage.
// If there’s no token, redirect to /login.

import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    // If no token, force‐redirect to /login
    return <Navigate to="/login" replace />;
  }
  // Otherwise, show the children (protected content)
  return children;
}
