const express = require("express");
const {
  createCurriculum,
  getCurriculums,
  getCurriculum,
  updateCurriculum,
  deleteCurriculum,
} = require("../controllers/CurriculumController");

const router = express.Router();

// GET all Curriculums
router.get("/", getCurriculums);

// GET a single Curriculum
router.get("/:id", getCurriculum);

// POST a new Curriculum
router.post("/", createCurriculum);

// DELETE a Curriculum
router.delete("/:id", deleteCurriculum);

// UPDATE a Curriculum
router.patch("/:id", updateCurriculum);

module.exports = router;
