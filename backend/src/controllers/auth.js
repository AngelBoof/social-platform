// controllers/auth.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register a brand-new user
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // 1) Check all fields present
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required." });
    }

    // 2) See if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use." });
    }

    // 3) Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // 4) Create & save
    const user = new User({ username, email, password: hash });
    await user.save();

    res.status(201).json({ message: "User registered." });
  } catch (err) {
    next(err);
  }
};

// Log an existing user in
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 2) Compare supplied password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 3) Issue a token (or set session, etc.)
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
