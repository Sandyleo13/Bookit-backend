"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load .env variables
dotenv_1.default.config();
const pool = mysql2_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    connectionLimit: 10,
});
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    }
    else {
        console.log("✅ Connected to MySQL database");
        connection.release();
    }
});
exports.default = pool.promise();
//# sourceMappingURL=db.js.map