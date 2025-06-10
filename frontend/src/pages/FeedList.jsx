// frontend/src/pages/FeedList.jsx
import React from "react";

export default function FeedList({ posts }) {
  if (!posts.length) {
    return <p>No posts yet.</p>;
  }
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <strong>{post.title}</strong>
          <p>{post.content}</p>
          <small>
            by user #{post.userId} on{" "}
            {new Date(post.createdAt).toLocaleString()}
          </small>
        </li>
      ))}
    </ul>
  );
}
