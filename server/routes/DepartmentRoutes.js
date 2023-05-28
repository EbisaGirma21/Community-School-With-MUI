const express = require("express");
const {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/DepartmentController");

const router = express.Router();

// GET all Departments
router.get("/", getDepartments);

// GET a single Department
router.get("/:id", getDepartment);

// POST a new Department
router.post("/", createDepartment);

// DELETE a Department
router.delete("/:id", deleteDepartment);

// UPDATE a Department
router.patch("/:id", updateDepartment);

module.exports = router;
