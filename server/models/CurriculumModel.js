const mongoose = require("mongoose");

const CurriculumSchema = new mongoose.Schema(
  {
    curriculumTitle: {
      type: String,
      required: true,
    },
    curriculumYear: {
      type: Number,
      required: true,
      min: 1970,
      max: 9999,
    },
    stage: {
      type: String,
      required: true,
      default: "PRM",
      enum: ["KG", "PRM", "PRM-II", "SEC", "PREP"],
    },
    classification: {
      type: String,
      required: true,
      default: "R",
      enum: ["R", "N", "D"],
    },
    totalMaximumLoad: {
      type: Number,
      required: true,
      min: 20,
      max: 40,
    },
    // curriculumState: {
    //   type: Number,
    //   required: true,
    // },
    grade: [{ type: mongoose.Schema.Types.ObjectId, ref: "GradeModel" }],
  },
  { timestamps: true }
);
const Curriculum = mongoose.model("Curriculum", CurriculumSchema);
module.exports = Curriculum;
