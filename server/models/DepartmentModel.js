const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
  },
  coordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
