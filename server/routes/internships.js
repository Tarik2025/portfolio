const express = require("express");
const sql = require("../db");
const auth = require("../middleware");

const router = express.Router();

// GET /api/internships - Public
router.get("/", async (req, res) => {
  try {
    const data = await sql`SELECT * FROM "Internship" ORDER BY "order" ASC`;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error fetching internships" });
  }
});

// POST /api/internships - Admin
router.post("/", auth, async (req, res) => {
  try {
    const { company, role, period, description, logo, points, skills, certificate, order } = req.body;
    const result = await sql`
      INSERT INTO "Internship" (company, role, period, description, logo, points, skills, certificate, "order")
      VALUES (${company}, ${role}, ${period}, ${description}, ${logo || ''}, ${points || []}, ${skills || []}, ${certificate || ''}, ${order || 0})
      RETURNING *
    `;
    res.status(201).json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error creating internship" });
  }
});

// PUT /api/internships/:id - Admin
router.put("/:id", auth, async (req, res) => {
  try {
    const { company, role, period, description, logo, points, skills, certificate, order } = req.body;
    const result = await sql`
      UPDATE "Internship" SET company=${company}, role=${role}, period=${period}, description=${description},
      logo=${logo || ''}, points=${points || []}, skills=${skills || []}, certificate=${certificate || ''}, "order"=${order || 0}
      WHERE id = ${req.params.id} RETURNING *
    `;
    res.json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error updating internship" });
  }
});

// DELETE /api/internships/:id - Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    await sql`DELETE FROM "Internship" WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error deleting internship" });
  }
});

module.exports = router;
