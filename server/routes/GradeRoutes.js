const express = require("express");
const {
  createGrade,
  getGrades,
  getGrade,
  getGradesByStage,
  updateGrade,
  deleteGrade,
} = require("../controllers/GradeController");

const router = express.Router();

// GET all Grades
router.get("/", getGrades);

// GET a single Grade
router.get("/:id", getGrade);

// GET grades by stage
router.get("/stage/:stage", getGradesByStage);

// POST a new Grade
router.post("/", createGrade);

// DELETE a Grade
router.delete("/:id", deleteGrade);

// UPDATE a Grade
router.patch("/:id", updateGrade);

module.exports = router;
