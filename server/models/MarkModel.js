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
    results: [
      {
        _semesters: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AcademicCurriculum.semesters",
          required: true,
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
                value: Number,
                status: {
                  type: String,
                  default: "notAssigned",
                },
              },
              test: {
                value: Number,
                status: {
                  type: String,
                  default: "notAssigned",
                },
              },
              assignment: {
                value: Number,
                status: {
                  type: String,
                  default: "notAssigned",
                },
              },
              midExam: {
                value: Number,
                status: {
                  type: String,
                  default: "notAssigned",
                },
              },
              finalExam: {
                value: Number,
                status: {
                  type: String,
                  default: "notAssigned",
                },
              },
            },
          },
        ],
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
