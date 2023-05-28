const Department = require("../models/DepartmentModel");
const mongoose = require("mongoose");

// get all Departments
const getDepartments = async (req, res) => {
  const departments = await Department.find({}).sort({ createdAt: -1 });
  res.status(200).json(departments);
};

// get a single Department
const getDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such department" });
  }
  const department = await Department.findById(id);

  if (!department) {
    return res.status(404).json({ error: "No such department" });
  }

  res.status(200).json(department);
};

// create a new Department
const createDepartment = async (req, res) => {
  const {
    departmentName,
  } = req.body;

  let emptyFields = [];

  if (!departmentName) {
    emptyFields.push("departmentName");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const department = await Department.create({
      departmentName,
    
    });
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Department
const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Department" });
  }

  const department = await Department.findOneAndDelete({ _id: id });

  if (!department) {
    return res.status(400).json({ error: "No such Department" });
  }

  res.status(200).json(department);
};

// update a Department
const updateDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Department" });
  }

  const department = await Department.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!department) {
    return res.status(400).json({ error: "No such Department" });
  }

  res.status(200).json(department);
};

module.exports = {
  getDepartments,
  getDepartment,
  createDepartment,
  deleteDepartment,
  updateDepartment,
};
