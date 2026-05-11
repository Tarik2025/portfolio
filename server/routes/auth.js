const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const sql = require("../db");
const auth = require("../middleware");

const router = express.Router();

// Track failed login attempts in memory
const failedAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

// Strict rate limit on login endpoint
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // max 10 requests per 15 min per IP
  message: { success: false, msg: "Too many login attempts. Try again later." },
  standardHeaders: true,
  legacyHeaders: false
});

// POST /api/auth/login
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, msg: "All fields required" });

    const ip = req.ip;
    const key = `${ip}_${email.toLowerCase()}`;

    // Check lockout
    const attempts = failedAttempts.get(key);
    if (attempts && attempts.count >= MAX_ATTEMPTS) {
      const elapsed = Date.now() - attempts.lastAttempt;
      if (elapsed < LOCKOUT_TIME) {
        const remaining = Math.ceil((LOCKOUT_TIME - elapsed) / 60000);
        return res.status(429).json({ success: false, msg: `Account locked. Try again in ${remaining} minutes.` });
      }
      failedAttempts.delete(key);
    }

    const users = await sql`SELECT * FROM "Admin" WHERE email = ${email.toLowerCase()}`;
    if (users.length === 0) {
      recordFailedAttempt(key);
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, users[0].password);
    if (!valid) {
      recordFailedAttempt(key);
      const current = failedAttempts.get(key);
      const remaining = MAX_ATTEMPTS - current.count;
      if (remaining <= 0) {
        return res.status(429).json({ success: false, msg: "Account locked for 15 minutes due to too many failed attempts." });
      }
      return res.status(401).json({ success: false, msg: `Invalid credentials. ${remaining} attempts remaining.` });
    }

    // Success - clear failed attempts
    failedAttempts.delete(key);

    const token = jwt.sign(
      { id: users[0].id, email: users[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// GET /api/auth/check
router.get("/check", auth, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

function recordFailedAttempt(key) {
  const current = failedAttempts.get(key) || { count: 0, lastAttempt: 0 };
  current.count += 1;
  current.lastAttempt = Date.now();
  failedAttempts.set(key, current);
}

module.exports = router;
