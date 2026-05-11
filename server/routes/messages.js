const express = require("express");
const rateLimit = require("express-rate-limit");
const sql = require("../db");
const auth = require("../middleware");

const router = express.Router();

// POST /api/messages - Public: submit contact message (NO auth required)
router.post("/", rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, msg: "Too many messages. Please try again later." }
}), async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, msg: "Please enter a valid email" });
    }
    if (name.length < 2) {
      return res.status(400).json({ success: false, msg: "Name must be at least 2 characters" });
    }
    if (message.length < 5) {
      return res.status(400).json({ success: false, msg: "Message must be at least 5 characters" });
    }

    await sql`INSERT INTO "Message" (name, email, message) VALUES (${name.trim()}, ${email.trim()}, ${message.trim()})`;
    res.status(201).json({ success: true, msg: "Message sent successfully!" });
  } catch (err) {
    console.error("Message save error:", err);
    res.status(500).json({ success: false, msg: "Error saving message. Please try again." });
  }
});

// GET /api/messages - Admin: get all messages
router.get("/", auth, async (req, res) => {
  try {
    const messages = await sql`SELECT * FROM "Message" ORDER BY "createdAt" DESC`;
    res.json({ success: true, data: messages });
  } catch (err) {
    console.error("Fetch messages error:", err);
    res.status(500).json({ success: false, msg: "Error fetching messages" });
  }
});

// PUT /api/messages/:id/read - Admin: mark as read
router.put("/:id/read", auth, async (req, res) => {
  try {
    await sql`UPDATE "Message" SET "isRead" = true WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error updating" });
  }
});

// DELETE /api/messages/all - Admin: delete all (specific path to avoid conflicts)
router.delete("/all", auth, async (req, res) => {
  try {
    await sql`DELETE FROM "Message"`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error deleting" });
  }
});

// DELETE /api/messages/:id - Admin: delete one
router.delete("/:id", auth, async (req, res) => {
  try {
    await sql`DELETE FROM "Message" WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error deleting" });
  }
});

module.exports = router;
