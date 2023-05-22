const mongoose = require("mongoose");

const AcademicSessionSchema = new mongoose.Schema(
  {
    academicYear: {
      type: Number,
      required: true,
      min: 1970,
      max: 9999,
    },
  },
  { timestamps: true }
);

// Ensure academicYear is unique across documents
AcademicSessionSchema.index({ academicYear: 1 }, { unique: true });

const AcademicSession = mongoose.model("AcademicSession", AcademicSessionSchema);

module.exports = AcademicSession;
