const express = require("express");
const {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
} = require("../controllers/SubjectController");

const router = express.Router();

// GET all Subjects
router.get("/:curriculumId/:gradeId", getSubjects);

// GET a single Subject
router.get("/:curriculumId/:gradeId/:subjectId", getSubject);

// POST a new Subject
router.post("/", createSubject);

// DELETE a Subject
router.delete("/:curriculumId/:gradeId/:subjectId", deleteSubject);

// UPDATE a Subject
router.patch("/:curriculumId/:gradeId/:subjectId", updateSubject);

module.exports = router;
