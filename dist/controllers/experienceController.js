"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExperienceById = exports.getAllExperiences = void 0;
const db_1 = __importDefault(require("../config/db"));
// ✅ Get all experiences
const getAllExperiences = async (req, res) => {
    try {
        const [rows] = await db_1.default.query("SELECT * FROM experiences");
        res.status(200).json(rows);
    }
    catch (error) {
        console.error("❌ Error fetching experiences:", error);
        res.status(500).json({ message: "Database error" });
    }
};
exports.getAllExperiences = getAllExperiences;
// ✅ Get single experience by ID
const getExperienceById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db_1.default.query("SELECT * FROM experiences WHERE id = ?", [id]);
        if (!rows || rows.length === 0) {
            res.status(404).json({ message: "Experience not found" });
            return;
        }
        res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error("❌ Error fetching single experience:", error);
        res.status(500).json({ message: "Database error" });
    }
};
exports.getExperienceById = getExperienceById;
//# sourceMappingURL=experienceController.js.map