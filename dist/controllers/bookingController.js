"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookings = exports.createBooking = void 0;
const db_1 = __importDefault(require("../config/db"));
// ✅ Create a new booking
const createBooking = async (req, res) => {
    try {
        console.log("📩 Incoming booking data:", req.body);
        const { name, email, promo_code, experience_id, total_price } = req.body;
        // 🧩 Validate required fields
        if (!name || !email || !experience_id || !total_price) {
            res.status(400).json({ message: "Missing required booking fields." });
            return;
        }
        // 🆔 Generate a unique booking ID
        const booking_id = "BKG-" + Date.now();
        // 💾 Insert booking into database
        const [result] = await db_1.default.query(`INSERT INTO bookings 
        (booking_id, name, email, experience_id, total_price, promo_code)
       VALUES (?, ?, ?, ?, ?, ?)`, [booking_id, name, email, experience_id, total_price, promo_code || null]);
        res.status(201).json({
            message: "✅ Booking created successfully!",
            bookingId: booking_id,
            insertedId: result.insertId,
        });
    }
    catch (error) {
        console.error("❌ Error creating booking:", error);
        res.status(500).json({
            message: "Server error while creating booking.",
            error,
        });
    }
};
exports.createBooking = createBooking;
// ✅ Get all bookings (for admin or testing)
const getAllBookings = async (req, res) => {
    try {
        const [rows] = await db_1.default.query(`
      SELECT 
        b.*, 
        e.title AS experience_title, 
        e.price AS experience_price 
      FROM bookings b
      LEFT JOIN experiences e ON b.experience_id = e.id
      ORDER BY b.id DESC
    `);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error("❌ Error fetching bookings:", error);
        res.status(500).json({ message: "Failed to fetch bookings." });
    }
};
exports.getAllBookings = getAllBookings;
//# sourceMappingURL=bookingController.js.map