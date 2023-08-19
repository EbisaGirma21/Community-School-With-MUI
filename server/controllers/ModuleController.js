const Module = require("../models/ModuleModel");
const mongoose = require("mongoose");
const User = require("../models/UserModel");
const Department = require("../models/DepartmentModel");
const Curriculum = require("../models/CurriculumModel");

// get all Modules
const getModules = async (req, res) => {
  const modules = await Module.find({}).sort({ createdAt: -1 });

  const module = await Promise.all(
    modules.map(async (mod) => {
      const department = await Department.findById(mod.department);
      const teacher = await User.findById(mod.coordinator);
      return {
        ...mod._doc,
        category: department ? department.departmentName : "Not Categorized",
        coordinatorTeacher: teacher
          ? teacher.gender === "Male"
            ? `Mr. ${teacher.firstName}`
            : `Mrs. ${teacher.firstName}`
          : "TBA",
      };
    })
  );

  res.status(200).json(module);
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
  const { moduleTitle, department, coordinator } = req.body;
  console.log(department, coordinator);
  let emptyFields = [];

  if (!moduleTitle) {
    emptyFields.push("moduleTitle");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all required the fields", emptyFields });
  }

  try {
    const module =
      !department && !coordinator
        ? await Module.create({
            moduleTitle,
          })
        : !department
        ? await Module.create({
            moduleTitle,
            coordinator,
          })
        : !coordinator
        ? await Module.create({
            moduleTitle,
            department,
          })
        : await Module.create({
            moduleTitle,
            department,
            coordinator,
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

  const exist = await Curriculum.find({
    "grades.subjects.module": id,
  });
  if (exist.length !== 0) {
    return res.status(405).json({
      error: "Deletion is not allowed once  Subject registered on it!",
    });
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
