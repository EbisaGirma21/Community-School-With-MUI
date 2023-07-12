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
    result: [
      {
        subject: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Curriculum.subjects",
          required: true,
        },
        assessment: {
          quiz: {
            type: Number,
            status: {
              type: String,
              default: "notAssigned",
            },
          },
          test: {
            type: Number,
            status: {
              type: String,
              default: "notAssigned",
            },
          },
          assignment: {
            type: Number,
            status: {
              type: String,
              default: "notAssigned",
            },
          },
          midExam: {
            type: Number,
            status: {
              type: String,
              default: "notAssigned",
            },
          },
          finalExam: {
            type: Number,
            status: {
              type: String,
              default: "notAssigned",
            },
          },
        },
      },
    ],
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  { timestamps: true },
  { _id: false }
);

const Mark = mongoose.model("Mark", MarkSchema);

module.exports = Mark;
