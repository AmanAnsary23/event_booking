const pool = require('../db/connection');


const getAllEvents = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM events WHERE date > NOW() ORDER BY date ASC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const createEvent = async (req, res) => {
  try {
    const { title, description, date, total_capacity } = req.body;

    if (!title || !date || !total_capacity) {
      return res.status(400).json({ success: false, message: 'title, date and total_capacity are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO events (title, description, date, total_capacity, remaining_tickets) VALUES (?, ?, ?, ?, ?)',
      [title, description, date, total_capacity, total_capacity]
    );

    res.status(201).json({ success: true, message: 'Event created', eventId: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllEvents, createEvent };