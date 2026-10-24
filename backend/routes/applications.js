const express = require("express");
const mongoose = require("mongoose");
const Application = require("../models/Application");

const router = express.Router();

// GET: Retrieve all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    console.error("Error fetching applications:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve applications"
    });
  }
});

// POST: Submit an application
router.post("/", async (req, res) => {
  try {
    const { studentName, email, rollNumber, internship } = req.body;

    if (
      typeof studentName !== "string" ||
      studentName.trim().length < 2 ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      typeof rollNumber !== "string" ||
      !rollNumber.trim() ||
      typeof internship !== "string" ||
      !internship.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid details in all fields"
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database is unavailable"
      });
    }

    const application = await Application.create({
      studentName: studentName.trim(),
      email: email.trim(),
      rollNumber: rollNumber.trim(),
      internship: internship.trim()
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      application
    });
  } catch (error) {
    console.error("Application submission error:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid application details"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to submit application"
    });
  }
});

module.exports = router;