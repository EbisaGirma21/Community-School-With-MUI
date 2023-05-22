const express = require("express");
const {
  createAcademicCurriculum,
  getAcademicCurriculums,
  getAcademicCurriculum,
  updateAcademicCurriculum,
  deleteAcademicCurriculum,
  getAcademicCurriculumByYear,
} = require("../controllers/AcademicCurriculumController");

const router = express.Router();

// GET all AcademicCurriculums
router.get("/", getAcademicCurriculums);

// GET a single AcademicCurriculum
router.get("/:id", getAcademicCurriculum);

// GET AcademicCurriculum By Year
router.get("/year/:acYear", getAcademicCurriculumByYear);

// POST a new AcademicCurriculum
router.post("/", createAcademicCurriculum);

// DELETE a AcademicCurriculum
router.delete("/:id", deleteAcademicCurriculum);

// UPDATE a AcademicCurriculum
router.patch("/:id", updateAcademicCurriculum);

module.exports = router;
