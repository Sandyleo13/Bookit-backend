// ✅ Get all bookings (for admin or testing)
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
