const express = require("express");
const db = require("./config/db");
const { v4: uuidv4 } = require("uuid");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();
app.use(express.json());

// Swagger
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// ✅ GET all events
app.get("/events", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM events WHERE date > NOW()"
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ POST create event
app.post("/events", async (req, res) => {
  try {
    const { title, description, date, total_capacity } = req.body;

    if (!title || !date || !total_capacity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await db.query(
      "INSERT INTO events (title, description, date, total_capacity, remaining_tickets) VALUES (?, ?, ?, ?, ?)",
      [title, description, date, total_capacity, total_capacity]
    );

    res.status(201).json({ message: "Event created" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ POST bookings (MAIN IMPORTANT API)
app.post("/bookings", async (req, res) => {
  const { user_id, event_id, tickets } = req.body;

  if (user_id == null || event_id == null || tickets == null) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (tickets <= 0) {
    return res.status(400).json({ error: "Invalid ticket count" });
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // ✅ check user exists
    const [user] = await conn.query(
      "SELECT id FROM users WHERE id=?",
      [user_id]
    );

    if (user.length === 0) {
      throw new Error("User not found");
    }

    // ✅ lock event row
    const [event] = await conn.query(
      "SELECT remaining_tickets FROM events WHERE id=? FOR UPDATE",
      [event_id]
    );

    if (event.length === 0) {
      throw new Error("Event not found");
    }

    if (event[0].remaining_tickets < tickets) {
      throw new Error("Not enough tickets");
    }

    const code = uuidv4();

    // ✅ insert booking
    await conn.query(
      "INSERT INTO bookings (user_id, event_id, booking_code, tickets) VALUES (?, ?, ?, ?)",
      [user_id, event_id, code, tickets]
    );

    // ✅ update tickets
    await conn.query(
      "UPDATE events SET remaining_tickets = remaining_tickets - ? WHERE id=?",
      [tickets, event_id]
    );

    await conn.commit();

    res.status(201).json({
      message: "Booking successful",
      booking_code: code
    });

  } catch (err) {
    await conn.rollback();
    res.status(400).json({ error: err.message });
  } finally {
    conn.release();
  }
});


// ✅ GET user bookings
app.get("/users/:id/bookings", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM bookings WHERE user_id=?",
      [req.params.id]
    );

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ POST attendance
app.post("/events/:id/attendance", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    const [booking] = await db.query(
      "SELECT tickets FROM bookings WHERE booking_code=? AND event_id=?",
      [code, req.params.id]
    );

    if (booking.length === 0) {
      return res.status(404).json({ error: "Invalid code" });
    }

    // ✅ prevent duplicate entry
    try {
      await db.query(
        "INSERT INTO attendance (booking_code) VALUES (?)",
        [code]
      );
    } catch (err) {
      return res.status(400).json({ error: "Already checked in" });
    }

    res.status(200).json({
      message: "Entry recorded",
      tickets: booking[0].tickets
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});