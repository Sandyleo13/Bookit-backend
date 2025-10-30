import { Request, Response } from "express";
import db from "../config/db";

// ✅ Get all experiences
export const getAllExperiences = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await db.query("SELECT * FROM experiences");
    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Error fetching experiences:", error);
    res.status(500).json({ message: "Database error" });
  }
};

// ✅ Get single experience by ID
export const getExperienceById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const [rows]: any = await db.query("SELECT * FROM experiences WHERE id = ?", [id]);

    if (!rows || rows.length === 0) {
      res.status(404).json({ message: "Experience not found" });
      return;
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("❌ Error fetching single experience:", error);
    res.status(500).json({ message: "Database error" });
  }
};
