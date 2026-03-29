const pool = require('../db/connection');
const { v4: uuidv4 } = require('uuid');


const createBooking = async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const { user_id, event_id } = req.body;

    if (!user_id || !event_id) {
      return res.status(400).json({ success: false, message: 'user_id and event_id are required' });
    }

    await conn.beginTransaction();

   
    const [events] = await conn.query(
      'SELECT * FROM events WHERE id = ? FOR UPDATE',
      [event_id]
    );

    if (events.length === 0) {
      await conn.rollback();
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (events[0].remaining_tickets <= 0) {
      await conn.rollback();
      return res.status(400).json({ success: false, message: 'No tickets available' });
    }


    const booking_code = uuidv4();


    await conn.query(
      'INSERT INTO bookings (user_id, event_id, booking_code) VALUES (?, ?, ?)',
      [user_id, event_id, booking_code]
    );

 
    await conn.query(
      'UPDATE events SET remaining_tickets = remaining_tickets - 1 WHERE id = ?',
      [event_id]
    );

    await conn.commit();

    res.status(201).json({ success: true, message: 'Booking successful', booking_code });
  } catch (error) {
    await conn.rollback();
    res.status(500).json({ success: false, message: error.message });
  } finally {
    conn.release();
  }
};

module.exports = { createBooking };