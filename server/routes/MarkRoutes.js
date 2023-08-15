const express = require("express");
const {
  getMarks,
  getMarkLists,
  addSubjectMarks,
} = require("../controllers/MarkController");

const router = express.Router();

// GET all Marks
router.get("/", getMarks);
router.get("/markList/:subjectId", getMarkLists);
router.post("/addmark", addSubjectMarks);

module.exports = router;