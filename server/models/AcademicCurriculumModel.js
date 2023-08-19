const mongoose = require("mongoose");

const AcademicCurriculumSchema = new mongoose.Schema({
  academicSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicSession",
    required: true,
  },
  curriculum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curriculum",
    required: true,
  },
  maxSemester: {
    type: Number,
    required: true,
  },
  semesters: [
    {
      _semesterLabel: {
        type: String,
        required: true,
      },
      _status: {
        type: String,
        required: true,
        default: "REG",
        enum: ["REG", "ONP", "CMP"],
      },
    },
  ],
});

AcademicCurriculumSchema.index(
  { academicSession: 1, curriculum: 1 },
  { unique: true }
);

const AcademicCurriculum = mongoose.model(
  "AcademicCurriculum",
  AcademicCurriculumSchema
);
module.exports = AcademicCurriculum;
