const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    requestedAcademicCurriculum: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicCurriculum",
    },
    requestedGrade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
    },
    requestedSection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
    requestedSemester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicCurriclum.Semester",
    },
    requestType: {
      type: String,
      required: true,
    },
    requestStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
