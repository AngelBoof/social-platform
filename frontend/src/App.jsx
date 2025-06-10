// frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/NavBar.jsx"; // <–– Check this path & casing
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Feed from "./pages/Feed.jsx";

export default function App() {
  return (
    <BrowserRouter>
      {/* ←−−− Make sure Navbar is *directly* inside BrowserRouter, before the <Routes> */}
      <Navbar />

      <Routes>
        {/* Redirect “/” to either /feed (if logged in) or /login */}
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/feed" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* PUBLIC routes (no token needed) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED route: only render <Feed /> if token is present; otherwise navigate to /login */}
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
