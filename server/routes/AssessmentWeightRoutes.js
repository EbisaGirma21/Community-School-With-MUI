const express = require("express");
const {
  createAssessmentWeight,
  getAssessmentWeights,
  getAssessmentWeight,
  updateAssessmentWeight,
  deleteAssessmentWeight,
} = require("../controllers/AssessmentWeightController");

const router = express.Router();

// GET all AssessmentWeights
router.get("/:curriculumId/:gradeId", getAssessmentWeights);

// GET a single AssessmentWeight
router.get("/:curriculumId/:gradeId/:subjectId", getAssessmentWeight);

// POST a new AssessmentWeight
router.post("/", createAssessmentWeight);

// DELETE a AssessmentWeight
router.delete("/:curriculumId/:gradeId/:subjectId", deleteAssessmentWeight);

// UPDATE a AssessmentWeight
router.patch("/:curriculumId/:gradeId/:subjectId", updateAssessmentWeight);

module.exports = router;
