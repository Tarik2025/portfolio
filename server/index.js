require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false }));
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/home", require("./routes/home"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/education", require("./routes/education"));
app.use("/api/internships", require("./routes/internships"));
app.use("/api/certifications", require("./routes/certifications"));

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Block admin from search engines
app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send("User-agent: *\nDisallow: /admin\nDisallow: /api/");
});

// Serve client build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
