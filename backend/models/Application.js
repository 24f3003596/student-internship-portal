const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      trim: true,
      maxlength: 30
    },

    internship: {
      type: String,
      required: [true, "Internship selection is required"],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);