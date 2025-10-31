// ✅ FIXED bookingController.ts
import { Request, Response } from "express";
import db from "../config/db";
import { ResultSetHeader } from "mysql2";

export const createBooking = async (req: Request, res: Response) => {
  try {
    console.log("📩 Incoming booking data:", req.body);

    const { name, email, promo_code, experience_id, total_price } = req.body;

    if (!name || !email || !experience_id || !total_price) {
      return res.status(400).json({ message: "Missing required booking fields." });
    }

    const booking_id = "BKG-" + Date.now();

    // ✅ Use correct column name (total_amount) based on your DB schema
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO bookings 
        (booking_id, name, email, experience_id, total_amount, promo_code)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [booking_id, name, email, experience_id, total_price, promo_code || null]
    );

    res.status(201).json({
      message: "✅ Booking created successfully!",
      bookingId: booking_id,
      insertedId: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(500).json({
      message: "Server error while creating booking.",
      error,
    });
  }
};
