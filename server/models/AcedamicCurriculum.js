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
});

const AcademicCurriculum = mongoose.model(
  "AcademicCurriculum",
  AcademicCurriculumSchema
);
export default AcademicCurriculum;
