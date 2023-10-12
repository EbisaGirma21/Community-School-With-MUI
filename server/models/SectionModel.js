const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
  {
    sectionLabel: {
      type: String,
      required: true,
    },
    academicCurriculum: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicCurriculum",
    },
    grade: {
      type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
    },
    homeRoomTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    semesters:[
      {
        _semester: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AcademicCurriculum.semesters",
        },
        _status: {
          type: String,
          required: true,
          default: "REG",
          enum: ["REG", "ONP", "CMP"],
        },
      }
    ],
    teachers: [
      {
        teacher: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
        },
        subject: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },
      },
    ],
  },
  { timestamps: true }
);

const Section = mongoose.model("Section", SectionSchema);

module.exports = Section;
