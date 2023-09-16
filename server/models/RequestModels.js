const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  requestAcademicCurriculum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicCurriculum",
  },
  requestGrade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
  },
  requestSection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
  },
  requestSemister: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicCurriclum.Semester",
  },
  requestType: {
    type: String,
    required: true,
  },
  requestStatus: {
    type: String,
    required: True,
  },
});

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
