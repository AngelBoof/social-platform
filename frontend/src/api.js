// frontend/src/api.js
const BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:3000";

export async function register({ name, email, password }) {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
}

export async function login({ email, password }) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  const { token, user } = await res.json();
  return { token, user };
}

export async function fetchPosts(token) {
  const res = await fetch(`${BASE}/api/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Could not fetch posts");
  return await res.json();
}

export async function createPost(token, { title, content }) {
  const res = await fetch(`${BASE}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error("Could not create post");
  return await res.json();
}
