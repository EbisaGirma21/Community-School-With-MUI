const Module = require("../models/ModuleModel");
const mongoose = require("mongoose");

// get all Modules
const getModules = async (req, res) => {
  const modules = await Module.find({}).sort({ createdAt: -1 });
  res.status(200).json(modules);
};

// get a single Module
const getModule = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such module" });
  }
  const module = await Module.findById(id);

  if (!module) {
    return res.status(404).json({ error: "No such module" });
  }

  res.status(200).json(module);
};

// create a new Module
const createModule = async (req, res) => {
  const {
    moduleTitle,
  } = req.body;

  let emptyFields = [];

  if (!moduleTitle) {
    emptyFields.push("moduleTitle");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const module = await Module.create({
      moduleTitle,
    
    });
    res.status(200).json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Module
const deleteModule = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Module" });
  }

  const module = await Module.findOneAndDelete({ _id: id });

  if (!module) {
    return res.status(400).json({ error: "No such Module" });
  }

  res.status(200).json(module);
};

// update a Module
const updateModule = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Module" });
  }

  const module = await Module.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!module) {
    return res.status(400).json({ error: "No such Module" });
  }

  res.status(200).json(module);
};

module.exports = {
  getModules,
  getModule,
  createModule,
  deleteModule,
  updateModule,
};
