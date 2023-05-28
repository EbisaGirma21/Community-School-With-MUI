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
    status: {
      type: String,
      required: true,
      default: "REG",
      enum: ["REG", "ONP", "PAS", "FAL"],
    },
    studentType: {
      type: String,
      enum: ["NOR", "TRN"],
    },
    currentEnrollement: {
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
      },
    ],
  },
  { timestamps: true },
  { _id: false }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
