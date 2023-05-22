const express = require("express");
const {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/StudentController");

const router = express.Router();

// GET all Students
router.get("new/", getStudents);

// GET a single Student
router.get("new/:Id", getStudent);

// POST a new Student
router.post("new/", createStudent);

// DELETE a Student
router.delete("new/:Id", deleteStudent);

// UPDATE a Student
router.patch("new/:Id", updateStudent);

module.exports = router;
