const express = require("express");
const {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  getElligibleStudent,
} = require("../controllers/StudentController");

const router = express.Router();

// GET all Students
router.get("/", getStudents);

// GET a single Student
router.get("/:id", getStudent);

// POST a new Student
router.post("/", createStudent);

// DELETE a Student
router.delete("/:id", deleteStudent);

// UPDATE a Student
router.patch("/:id", updateStudent);

// UPDATE a Student
router.get("/elligible/:gradeId", getElligibleStudent);

module.exports = router;
