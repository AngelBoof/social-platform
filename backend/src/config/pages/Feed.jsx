// in src/pages/Feed.jsx
import { useState, useEffect } from "react";
import FeedList from "./FeedList";
import NewPost from "./NewPost";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // wherever you stored it
    fetch("http://localhost:3000/api/posts", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Feed</h1>
      {posts.map((p) => (
        <div key={p.id}>
          <h2>{p.title}</h2>
          <p>{p.content}</p>
          <small>by user #{p.userId}</small>
        </div>
      ))}
    </div>
  );
}
