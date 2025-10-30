import express from "express";
import { getAllExperiences, getExperienceById } from "../controllers/experienceController";

const router = express.Router();

// ✅ Get all experiences
router.get("/", getAllExperiences);

// ✅ Get single experience by ID
router.get("/:id", getExperienceById);

export default router; // 👈 Default export
