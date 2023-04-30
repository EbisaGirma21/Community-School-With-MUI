const mongoose = require("mongoose");
const SubjectModel =require('./SubjectModel')

const GradeSchema = new mongoose.Schema(
  {
    stage: {
      type: String,
      required: true,
      enum: ["KG", "PRM", "PRM-II", "SEC", "PREP"],
    },
    level: {
      type: Number,
      min: 1,
      max: 12,
      required: true,
    },
    branch: {
      type: String,
      default: "GEN",
      enum: ["GEN", "NAT", "SOC"],
    },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  },
  { timestamps: true }
);

const Grade = mongoose.model("Grade", GradeSchema);

module.exports = Grade;
