const mongoose = require("mongoose");

const MarkSchema = new mongoose.Schema(
  {
    academicCurriculum: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicCurriculum",
    },
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curriculum.subjects",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    assessment: {
      quiz: Number,
      test: Number,
      assignment: Number,
      midExam: Number,
      finalExam: Number,
    },
  },
  { timestamps: true },
  { _id: false }
);

const Mark = mongoose.model("Mark", MarkSchema);

module.exports = Mark;
