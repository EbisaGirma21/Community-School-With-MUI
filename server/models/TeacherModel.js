const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
  { _id: false }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
