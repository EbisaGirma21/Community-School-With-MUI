const express = require("express");
const {
  getMarks,
  getMarkLists,
  addSubjectMarks,
  getAverageMarks,
  getAverageMarkLists,
} = require("../controllers/MarkController");

const router = express.Router();

// GET all Marks
router.get("/:gradeId/:sectionId/:semesterId", getMarks);
router.get("/:gradeId/:sectionId", getAverageMarks);
router.get(
  "/markList/:gradeId/:sectionId/:subjectId/:semesterId",
  getMarkLists
);
router.get("/markList/:gradeId/:sectionId/:subjectId", getAverageMarkLists);
router.post("/addmark", addSubjectMarks);

module.exports = router;
