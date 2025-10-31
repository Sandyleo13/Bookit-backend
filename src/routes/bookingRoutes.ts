import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
} from "../controllers/bookingController";

const router = express.Router();

// Create new booking
router.post("/", createBooking);

// Get all bookings
router.get("/", getAllBookings);

// ✅ Get single booking by ID
router.get("/:booking_id", getBookingById);

export default router;
