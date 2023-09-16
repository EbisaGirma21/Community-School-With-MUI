const Department = require("../models/DepartmentModel");
const mongoose = require("mongoose");
const User = require("../models/UserModel");

// get all Departments
const getDepartments = async (req, res) => {
  const departments = await Department.find({}).sort({ createdAt: -1 });

  const department = await Promise.all(
    departments.map(async (depar) => {
      const teacher = await User.findById(depar.coordinator);
      return {
        ...depar._doc,
        coordinatorTeacher: teacher
          ? teacher.gender === "Male"
            ? `Mr. ${teacher.firstName} ${teacher.middleName}`
            : `Mrs. ${teacher.firstName} ${teacher.middleName}`
          : "TBA",
      };
    })
  );

  res.status(200).json(department);
};

// get a single Department
const getDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such department" });
  }
  const departments = await Department.findById(id);
  const department = await Promise.all(
    departments.map(async (depar) => {
      const teacher = await User.findById(depar.coordinator);
      return {
        ...depar._doc,
        coordinatorTeacher: teacher
          ? teacher.gender === "Male"
            ? `Mr. ${teacher.firstName} ${teacher.middleName}`
            : `Mrs. ${teacher.firstName} ${teacher.middleName}`
          : "TBA",
      };
    })
  );

  res.status(200).json(department);
};

// create a new Department
const createDepartment = async (req, res) => {
  const { departmentName, coordinator } = req.body;

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
    const department = coordinator
      ? await Department.create({
          departmentName,
          coordinator: coordinator,
        })
      : await Department.create({
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
