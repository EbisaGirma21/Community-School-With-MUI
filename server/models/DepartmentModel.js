const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
  },
});

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
