const mongoose = require("mongoose");
const ModuleModel = require("./ModuleModel");

const subjectSchema = new mongoose.Schema({
  curriculum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CurriculumModel",
    required: true,
  },
  grade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GradeModel",
    required: true,
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ModuleModel",
    required: true,
  },
  subjectLoad: {
    type: Number,
    required: true,
    min: 1,
    max: 7,
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
