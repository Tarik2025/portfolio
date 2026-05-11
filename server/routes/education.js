const express = require("express");
const sql = require("../db");
const auth = require("../middleware");

const router = express.Router();

// GET /api/education - Public
router.get("/", async (req, res) => {
  try {
    const data = await sql`SELECT * FROM "Education" ORDER BY "order" ASC`;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error fetching education" });
  }
});

// POST /api/education - Admin
router.post("/", auth, async (req, res) => {
  try {
    const { school, degree, period, cgpa, logo, image, highlights, coursework, order } = req.body;
    const result = await sql`
      INSERT INTO "Education" (school, degree, period, cgpa, logo, image, highlights, coursework, "order")
      VALUES (${school}, ${degree}, ${period}, ${cgpa}, ${logo || ''}, ${image || ''}, ${highlights || []}, ${coursework || []}, ${order || 0})
      RETURNING *
    `;
    res.status(201).json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error creating education" });
  }
});

// PUT /api/education/:id - Admin
router.put("/:id", auth, async (req, res) => {
  try {
    const { school, degree, period, cgpa, logo, image, highlights, coursework, order } = req.body;
    const result = await sql`
      UPDATE "Education" SET school=${school}, degree=${degree}, period=${period}, cgpa=${cgpa},
      logo=${logo || ''}, image=${image || ''}, highlights=${highlights || []}, coursework=${coursework || []}, "order"=${order || 0}
      WHERE id = ${req.params.id} RETURNING *
    `;
    res.json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error updating education" });
  }
});

// DELETE /api/education/:id - Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    await sql`DELETE FROM "Education" WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error deleting education" });
  }
});

module.exports = router;
