// controllers/auth.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// Register a brand-new user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1) Check all fields present
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required." });
    }

    // 2) See if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already in use." });
    }

    // 3) Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4) Create & save
    const user = await User.create({ name, email, passwordHash });
    const { id, createdAt, updatedAt } = user;
    res.status(201).json({ id, name, email, createdAt, updatedAt });
  } catch (err) {
    next(err);
  }
};

// Log an existing user in
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 2) Compare supplied password with stored hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 3) Issue a token (or set session, etc.)
    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
