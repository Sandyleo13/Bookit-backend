import express from "express";
import { createBooking, getAllBookings } from "../controllers/bookingController";

const router = express.Router();

// ✅ Create a new booking
router.post("/", createBooking);

// ✅ Get all bookings
router.get("/", getAllBookings);

export default router; // 👈 Default export
