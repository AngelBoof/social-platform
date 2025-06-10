// frontend/src/pages/Feed.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api.js";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE}/api/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts || []);
      })
      .catch((err) => {
        console.error("Fetch posts error:", err);
      });
  }, [navigate, token]);

  function handleNewPost(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    fetch(`${API_BASE}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Could not create post");
        return res.json();
      })
      .then((createdPost) => {
        setPosts((prev) => [createdPost, ...prev]);
        setTitle("");
        setContent("");
      })
      .catch((err) => {
        console.error("Create post error:", err);
      });
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Feed</h1>
      <form onSubmit={handleNewPost} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "0.5rem", width: "200px", marginRight: "1rem" }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{
            padding: "0.5rem",
            width: "300px",
            height: "100px",
            verticalAlign: "top",
          }}
        />
        <button type="submit" style={{ marginLeft: "1rem" }}>
          Post
        </button>
      </form>

      {posts.length === 0 ? (
        <div>No posts yet.</div>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {posts.map((p) => (
            <li
              key={p.id}
              style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #ccc",
                paddingBottom: "1rem",
              }}
            >
              <strong>{p.title}</strong>
              <p>{p.content}</p>
              <small>by User #{p.authorId}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
