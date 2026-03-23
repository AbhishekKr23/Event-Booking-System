const db = require("../config/db");

// GET events
exports.getEvents = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM events");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};