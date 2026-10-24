require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map(url => url.trim())
    : true
}));

app.use(express.json());

// Available internships
const internships = [
  {
    id: "1",
    title: "Full Stack Developer Intern",
    company: "TechNova Solutions",
    location: "Remote",
    duration: "3 Months",
    stipend: "₹10,000/month",
    description: "Develop web applications using React, Node.js and MongoDB.",
    skills: ["React", "Node.js", "Express", "MongoDB"]
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "DataSphere Analytics",
    location: "Bangalore",
    duration: "4 Months",
    stipend: "₹12,000/month",
    description: "Analyze datasets and build predictive models.",
    skills: ["Python", "Pandas", "Machine Learning"]
  },
  {
    id: "3",
    title: "Machine Learning Intern",
    company: "AI Innovators",
    location: "Remote",
    duration: "3 Months",
    stipend: "₹15,000/month",
    description: "Build and evaluate machine learning models.",
    skills: ["Python", "Scikit-learn", "Statistics"]
  },
  {
    id: "4",
    title: "Backend Developer Intern",
    company: "CloudBridge Technologies",
    location: "Chennai",
    duration: "6 Months",
    stipend: "₹12,000/month",
    description: "Build REST APIs and database-backed applications.",
    skills: ["Node.js", "Express", "MongoDB"]
  }
];

// Test server
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student Internship Portal API is running"
  });
});

// Get all internships
app.get("/api/internships", (req, res) => {
  res.json({ success: true, internships });
});

// Get one internship
app.get("/api/internships/:id", (req, res) => {
  const internship = internships.find(item => item.id === req.params.id);

  if (!internship) {
    return res.status(404).json({
      success: false,
      message: "Internship not found"
    });
  }

  res.json({ success: true, internship });
});

// Application routes
app.use("/api/applications", require("./routes/applications"));

// Unknown endpoint
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

startServer();