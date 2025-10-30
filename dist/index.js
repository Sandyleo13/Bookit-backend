"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db")); // ✅ MySQL connection pool
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes")); // ✅ Default import
const experienceRoutes_1 = __importDefault(require("./routes/experienceRoutes")); // ✅ Default import
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ✅ Test DB connection before starting server
db_1.default.getConnection()
    .then(() => {
    console.log("✅ Connected to MySQL database");
    // Routes
    app.use("/api/bookings", bookingRoutes_1.default);
    app.use("/api/experiences", experienceRoutes_1.default);
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
//# sourceMappingURL=index.js.map