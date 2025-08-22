const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// ✅ MongoDB Model
const Contact = require("./models/contact");

// ✅ Middleware
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(morgan("dev")); 
app.use(helmet()); 
app.use(cors()); 

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// ✅ View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Static files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Website Pages
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/education", (req, res) => res.render("education"));
app.get("/internships", (req, res) => res.render("internships"));
app.get("/skills", (req, res) => res.render("skills"));
app.get("/projects", (req, res) => res.render("projects"));
app.get("/certifications-achievements", (req, res) => res.render("certifications-achievements"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/resume", (req, res) => res.render("resume"));

// ✅ Contact API (Save Message to DB)
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({
      success: true,
      msg: "Message saved successfully",
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error saving message" });
  }
});

// ✅ Show login form first
app.get("/messages", (req, res) => {
  res.render("login"); // renders login.ejs
});

// ✅ Handle login form
app.post("/messages", async (req, res) => {
  const { userId, password } = req.body;

  const ADMIN_ID = "TARIK2025";
  const ADMIN_PASSWORD = "Apple@2302";

  if (userId !== ADMIN_ID || password !== ADMIN_PASSWORD) {
    return res.render("login", { error: "❌ Invalid User ID or Password" });
  }

  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.render("messages", { messages });
  } catch (error) {
    res.status(500).send("Error loading messages");
  }
});


// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
