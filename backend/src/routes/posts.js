import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { Post } from "../models/Post.js";

const router = new Router();

// GET all posts
router.get("/", requireAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [["createdAt", "DESC"]] });
    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch posts" });
  }
});

// Create a new post
router.post("/", requireAuth, async (req, res) => {
  try {
    const authorId = req.user.id;
    const { title, content } = req.body;
    const post = await Post.create({ title, content, authorId });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create post" });
  }
});

export default router;
