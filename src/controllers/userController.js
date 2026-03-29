const pool = require('../db/connection');

const getUserBookings = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `SELECT b.id, b.booking_code, b.booking_date, 
              e.title, e.date, e.description 
       FROM bookings b 
       JOIN events e ON b.event_id = e.id 
       WHERE b.user_id = ?`,
      [id]
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUserBookings };