const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
  moduleTitle: {
    type: String,
    required: true,
  },
});

const Module = mongoose.model("Module", ModuleSchema);

module.exports = Module;
