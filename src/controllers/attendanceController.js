const pool = require('../db/connection');


const markAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { booking_code } = req.body;

    if (!booking_code) {
      return res.status(400).json({ success: false, message: 'booking_code is required' });
    }


    const [bookings] = await pool.query(
      'SELECT * FROM bookings WHERE booking_code = ? AND event_id = ?',
      [booking_code, id]
    );

    if (bookings.length === 0) {
      return res.status(404).json({ success: false, message: 'Invalid booking code' });
    }

    const booking = bookings[0];

    
    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total_booked FROM bookings WHERE event_id = ?',
      [id]
    );

  
    await pool.query(
      'INSERT INTO event_attendance (user_id, event_id, booking_code) VALUES (?, ?, ?)',
      [booking.user_id, id, booking_code]
    );

    res.json({
      success: true,
      message: 'Attendance marked',
      total_tickets_booked: countResult[0].total_booked
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { markAttendance };