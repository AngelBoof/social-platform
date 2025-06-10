// backend/src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { sequelize } from "./config/db.js";

dotenv.config();
const app = express();

// enable CORS from your frontend (port 5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Mount public routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// *** Mount protected post routes ***
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log("✅ Models synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();
