const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema({
  stage: {
    type: String,
    required: true,
    enum: ["KG", "PRM-I", "PRM-II", "SEC", "PREP"],
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
});

GradeSchema.index({ stage: 1, level: 1, branch: 1 }, { unique: true });

const Grade = mongoose.model("Grade", GradeSchema);

module.exports = Grade;
