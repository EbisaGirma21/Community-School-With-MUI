const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
  moduleTitle: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Deparment",
  },
  coordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

const Module = mongoose.model("Module", ModuleSchema);

module.exports = Module;
