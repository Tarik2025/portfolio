const express = require("express");
const sql = require("../db");
const auth = require("../middleware");

const router = express.Router();

// GET /api/skills - Public
router.get("/", async (req, res) => {
  try {
    const data = await sql`SELECT * FROM "Skill" ORDER BY "order" ASC`;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error fetching skills" });
  }
});

// POST /api/skills - Admin
router.post("/", auth, async (req, res) => {
  try {
    const { category, icon, items, order } = req.body;
    const result = await sql`
      INSERT INTO "Skill" (category, icon, items, "order")
      VALUES (${category}, ${icon || ''}, ${items || []}, ${order || 0})
      RETURNING *
    `;
    res.status(201).json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error creating skill" });
  }
});

// PUT /api/skills/:id - Admin
router.put("/:id", auth, async (req, res) => {
  try {
    const { category, icon, items, order } = req.body;
    const result = await sql`
      UPDATE "Skill" SET category=${category}, icon=${icon || ''}, items=${items || []}, "order"=${order || 0}
      WHERE id = ${req.params.id} RETURNING *
    `;
    res.json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error updating skill" });
  }
});

// DELETE /api/skills/:id - Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    await sql`DELETE FROM "Skill" WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error deleting skill" });
  }
});

module.exports = router;
