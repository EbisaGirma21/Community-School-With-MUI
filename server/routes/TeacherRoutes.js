const express = require("express");
const {
  createTeacher,
  getTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/TeacherController");

const router = express.Router();

// GET all Teachers
router.get("/", getTeachers);

// GET a single Teacher
router.get("/:id", getTeacher);

// POST a new Teacher
router.post("/", createTeacher);

// DELETE a Teacher
router.delete("/:id", deleteTeacher);

// UPDATE a Teacher
router.patch("/:id", updateTeacher);

module.exports = router;
