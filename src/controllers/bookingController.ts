import { Request, Response } from "express";
import db from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

// ✅ Create a new booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    console.log("📩 Incoming booking data:", req.body);

    const { name, email, promo_code, experience_id, total_price } = req.body;

    // 🧩 Validation
    if (!name || !email || !experience_id || !total_price) {
      res.status(400).json({ message: "Missing required booking fields." });
      return;
    }

    const booking_id = "BKG-" + Date.now();

    // ✅ FIXED: match DB column name (total_price)
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO bookings 
        (booking_id, name, email, experience_id, total_price, promo_code)
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

// ✅ Get all bookings (for admin/testing)
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(`
      SELECT 
        b.*, 
        e.title AS experience_title, 
        e.price AS experience_price 
      FROM bookings b
      LEFT JOIN experiences e ON b.experience_id = e.id
      ORDER BY b.id DESC
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
};

// ✅ Get single booking by booking_id (for /api/bookings/:booking_id)
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const { booking_id } = req.params;

    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT 
        b.*, 
        e.title AS experience_title, 
        e.price AS experience_price 
      FROM bookings b
      LEFT JOIN experiences e ON b.experience_id = e.id
      WHERE b.booking_id = ?
      `,
      [booking_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("❌ Error fetching booking by ID:", error);
    res.status(500).json({ message: "Server error while fetching booking." });
  }
};
