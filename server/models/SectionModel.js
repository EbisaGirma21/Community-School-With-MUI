const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
  {
    sectionLabel: {
      type: String,
      required: true,
    },
    academicCurriculum: {
      type: String,
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
