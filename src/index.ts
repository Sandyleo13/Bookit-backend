import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db"; // ✅ MySQL connection pool
import bookingRoutes from "./routes/bookingRoutes"; // ✅ Default import
import experienceRoutes from "./routes/experienceRoutes"; // ✅ Default import

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Test DB connection before starting server
db.getConnection()
  .then(() => {
    console.log("✅ Connected to MySQL database");

    // Routes
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/experiences", experienceRoutes);

    // Default route
    app.get("/", (req, res) => {
      res.send("🚀 Backend API running successfully!");
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
