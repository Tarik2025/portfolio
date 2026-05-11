const express = require("express");
const sql = require("../db");
const auth = require("../middleware");

const router = express.Router();

// ===== ACHIEVEMENTS (must be before :id routes) =====

// POST /api/certifications/achievements - Admin
router.post("/achievements", auth, async (req, res) => {
  try {
    const { text, order } = req.body;
    const result = await sql`
      INSERT INTO "Achievement" (text, "order") VALUES (${text}, ${order || 0}) RETURNING *
    `;
    res.status(201).json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error creating achievement" });
  }
});

// PUT /api/certifications/achievements/:id - Admin
router.put("/achievements/:id", auth, async (req, res) => {
  try {
    const { text, order } = req.body;
    const result = await sql`
      UPDATE "Achievement" SET text=${text}, "order"=${order || 0}
      WHERE id = ${req.params.id} RETURNING *
    `;
    res.json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error updating achievement" });
  }
});

// DELETE /api/certifications/achievements/:id - Admin
router.delete("/achievements/:id", auth, async (req, res) => {
  try {
    await sql`DELETE FROM "Achievement" WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error deleting achievement" });
  }
});

// ===== CERTIFICATIONS =====

// GET /api/certifications - Public
router.get("/", async (req, res) => {
  try {
    const certs = await sql`SELECT * FROM "Certification" ORDER BY "order" ASC`;
    const achievements = await sql`SELECT * FROM "Achievement" ORDER BY "order" ASC`;
    res.json({ success: true, data: { certifications: certs, achievements } });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error fetching" });
  }
});

// POST /api/certifications - Admin
router.post("/", auth, async (req, res) => {
  try {
    const { title, issuer, image, points, tools, order } = req.body;
    const result = await sql`
      INSERT INTO "Certification" (title, issuer, image, points, tools, "order")
      VALUES (${title}, ${issuer}, ${image || ''}, ${points || []}, ${tools || ''}, ${order || 0})
      RETURNING *
    `;
    res.status(201).json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error creating certification" });
  }
});

// PUT /api/certifications/:id - Admin
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, issuer, image, points, tools, order } = req.body;
    const result = await sql`
      UPDATE "Certification" SET title=${title}, issuer=${issuer}, image=${image || ''},
      points=${points || []}, tools=${tools || ''}, "order"=${order || 0}
      WHERE id = ${req.params.id} RETURNING *
    `;
    res.json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error updating certification" });
  }
});

// DELETE /api/certifications/:id - Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    await sql`DELETE FROM "Certification" WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error deleting certification" });
  }
});

module.exports = router;
