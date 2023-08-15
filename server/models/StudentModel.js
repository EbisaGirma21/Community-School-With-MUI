const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    birthDate: {
      type: Date,
      required: true,
    },
    registrationType: {
      type: String,
      enum: ["NOR", "TRN"],
    },
    currentEnrollement: {
      _academicCurriculum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicCurriculum",
      },
      _grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade",
      },
      _section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
      _status: {
        type: String,
        required: true,
        default: "REG",
        enum: ["REG", "ONP", "PAS", "FAL"],
      },
    },
    enrollment_history: [
      {
        _academicCurriculum: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AcademicCurriculum",
        },
        _grade: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Grade",
        },
        _section: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Section",
        },
        _status: {
          type: String,
          required: true,
          default: "REG",
          enum: ["REG", "ONP", "PAS", "FAL"],
        },
      },
    ],
  },
  { timestamps: true },
  { _id: false }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
