const express = require("express");
const sql = require("../db");
const auth = require("../middleware");

const router = express.Router();

// GET /api/projects - Public
router.get("/", async (req, res) => {
  try {
    const data = await sql`SELECT * FROM "Project" ORDER BY "order" ASC, "createdAt" DESC`;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error fetching projects" });
  }
});

// POST /api/projects - Admin: create
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, image, tech, skills, githubUrl, liveUrl, order } = req.body;
    const result = await sql`
      INSERT INTO "Project" (title, description, image, tech, skills, "githubUrl", "liveUrl", "order")
      VALUES (${title}, ${description}, ${image || ''}, ${tech || []}, ${skills || ''}, ${githubUrl || ''}, ${liveUrl || ''}, ${order || 0})
      RETURNING *
    `;
    res.status(201).json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error creating project" });
  }
});

// PUT /api/projects/:id - Admin: update
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, image, tech, skills, githubUrl, liveUrl, order } = req.body;
    const result = await sql`
      UPDATE "Project" SET title=${title}, description=${description}, image=${image || ''}, 
      tech=${tech || []}, skills=${skills || ''}, "githubUrl"=${githubUrl || ''}, "liveUrl"=${liveUrl || ''}, "order"=${order || 0}
      WHERE id = ${req.params.id} RETURNING *
    `;
    res.json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error updating project" });
  }
});

// DELETE /api/projects/:id - Admin: delete
router.delete("/:id", auth, async (req, res) => {
  try {
    await sql`DELETE FROM "Project" WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error deleting project" });
  }
});

module.exports = router;
