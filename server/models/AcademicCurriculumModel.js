const mongoose = require("mongoose");

const AcademicCurriculumSchema = new mongoose.Schema({
  academicSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicSessionModel",
    required: true,
  },
  curriculum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CurriculumModel",
    required: true,
  },
  maxSemester: {
    type: Number,
    required: true,
  },
});

const AcademicCurriculum = mongoose.model(
  "AcademicCurriculum",
  AcademicCurriculumSchema
);
module.exports = AcademicCurriculum;
