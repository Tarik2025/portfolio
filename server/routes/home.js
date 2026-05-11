const express = require("express");
const sql = require("../db");
const auth = require("../middleware");

const router = express.Router();

// GET /api/home - Public
router.get("/", async (req, res) => {
  try {
    const data = await sql`SELECT * FROM "HomeContent" LIMIT 1`;
    res.json({ success: true, data: data[0] || null });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error fetching home content" });
  }
});

// PUT /api/home - Admin: update home content
router.put("/", auth, async (req, res) => {
  try {
    const { greeting, typingText, subtitle, description, profileImage } = req.body;
    const existing = await sql`SELECT id FROM "HomeContent" LIMIT 1`;
    
    if (existing.length === 0) {
      const result = await sql`
        INSERT INTO "HomeContent" (greeting, "typingText", subtitle, description, "profileImage")
        VALUES (${greeting}, ${typingText}, ${subtitle}, ${description}, ${profileImage || '/images/Profile.jpg'})
        RETURNING *
      `;
      return res.json({ success: true, data: result[0] });
    }

    const result = await sql`
      UPDATE "HomeContent" SET greeting=${greeting}, "typingText"=${typingText}, subtitle=${subtitle},
      description=${description}, "profileImage"=${profileImage || '/images/Profile.jpg'}
      WHERE id = ${existing[0].id} RETURNING *
    `;
    res.json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error updating home content" });
  }
});

module.exports = router;
