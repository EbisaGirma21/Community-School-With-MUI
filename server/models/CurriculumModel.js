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
      enum: ["KG", "PRM-I", "PRM-II", "SEC", "PREP"],
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
    curriculum_state: {
      type: Number,
      required: true,
      default: "1",
    },
    grades: [
      {
        grade: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Grade",
        },
        subjects: [
          {
            module: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Module",
              required: true,
            },
            subject_load: {
              type: Number,
              required: true,
              min: 1,
              max: 7,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

CurriculumSchema.index(
  { curriculumTitle: 1, curriculumYear: 1 },
  { unique: true }
);

const Curriculum = mongoose.model("Curriculum", CurriculumSchema);
module.exports = Curriculum;
