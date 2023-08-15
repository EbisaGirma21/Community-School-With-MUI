const express = require("express");
const {
  createStudent,
  createTransferStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  getElligibleStudent,
  enrollStudents,
} = require("../controllers/StudentController");

const router = express.Router();

// GET all Students
router.get("/", getStudents);

// GET a single Student
router.get("/:id", getStudent);

// POST a new Student
router.post("/", createStudent);

// POST a transfer Student
router.post("/transfer", createTransferStudent);

// DELETE a Student
router.delete("/:id", deleteStudent);

// Enroll Student
router.patch("/enroll", enrollStudents);

// UPDATE a Student
router.patch("/:id", updateStudent);


// Get a  Elligible Student
router.get("/elligible/:gradeId", getElligibleStudent);


module.exports = router;
