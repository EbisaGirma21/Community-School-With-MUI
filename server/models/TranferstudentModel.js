const mongoose = require("mongoose");

const TransferStudentSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    transferYear: { type: Number, required: true },
    transferStage: { type: String, required: true },
    transferGrade: { type: String, required: true },
    transferClassification: { type: String, required: true },
    transferTotalMark: { type: Number, required: true },
    transferAverage: { type: Number, required: true },
    transferAcademicStatus: { type: String, required: true },
    nameOfSchool: { type: String, required: true },
    addressOfSchool: { type: String, required: true },
    contactOfSchool: { type: String, required: true },
    otherInfo: { type: String, required: true },
  },
  { timestamps: true },
  { _id: false }
);

const TransferStudent = mongoose.model(
  "TransferStudent",
  TransferStudentSchema
);

module.exports = TransferStudent;
