// backend/src/routes/users.js
import { Router } from "express";
import bcrypt from "bcryptjs";
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

// Define the User model (if you haven’t already)
const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true, // createdAt + updatedAt
  }
);

const router = Router();

// GET /api/users → list all users (without their passwordHash)
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
    });
    res.json({ users });
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:id → one user by pk
router.get("/:id", async (req, res, next) => {
  try {
    const u = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
    });
    if (!u) return res.status(404).json({ error: "Not found" });
    res.json({ user: u });
  } catch (err) {
    next(err);
  }
});

// POST /api/users → register a new user
router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "name, email and password are required" });
    }

    // Hash your password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, passwordHash });
    // return the created record (sans hash)
    const { id, createdAt, updatedAt } = newUser;
    res.status(201).json({ user: { id, name, email, createdAt, updatedAt } });
  } catch (err) {
    // unique‐constraint violation on email?
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "Email already in use" });
    }
    next(err);
  }
});

export default router;
