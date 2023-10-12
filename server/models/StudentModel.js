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
      _academicYear: {
        type: Number,
      },
      _academicCurriculum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicCurriculum",
      },
      _grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade",
      },
      _stage: {
        type: String,
      },
      _classification: {
        type: String,
      },
      _section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
      _totalMark: {
        type: Number,
      },
      _average: {
        type: Number,
      },
      _status: {
        type: String,
        required: true,
        default: "REG",
        enum: ["NEW","REG", "ONP", "PAS", "FAL"],
      },
    },
    enrollment_history: [
      {
        _academicYear: {
          type: Number,
          required: true,
        },
        _academicCurriculum: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AcademicCurriculum",
        },
        _grade: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Grade",
        },
        _stage: {
          type: String,
          required: true,
        },
        _classification: {
          type: String,
        },
        _section: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Section",
        },
        _totalMark: {
          type: Number,
          required: true,
        },
        _average: {
          type: Number,
          required: true,
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
