const express = require("express");
const multer = require("multer");
const path = require("path");
const auth = require("../middleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedExt = /jpeg|jpg|png|gif|webp|pdf|svg/;
    const allowedMime = /image\/(jpeg|jpg|png|gif|webp|svg\+xml)|application\/pdf/;
    const ext = allowedExt.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedMime.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error("Only images (jpg, png, gif, webp, svg) and PDFs allowed"));
  }
});

// POST /api/upload - Admin: upload file
router.post("/", auth, (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
    if (!req.file) return res.status(400).json({ success: false, msg: "No file uploaded" });
    const url = `/uploads/${req.file.filename}`;
    res.json({ success: true, url });
  });
});

module.exports = router;
