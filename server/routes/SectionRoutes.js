const express = require("express");
const {
  createSection,
  getSections,
  getSection,
  updateSection,
  deleteSection,
} = require("../controllers/SectionController");
const { getSectionSubject,assignTeacher,assignHomeRoomTeacher } = require("../controllers/AssignTeacherController");
const router = express.Router();

// GET all Sections
router.get("/", getSections);

// GET a single Section
router.get("/:id", getSection);

// POST a new Section
router.post("/", createSection);

// DELETE a Section
router.delete("/:id", deleteSection);

// UPDATE a Section
router.patch("/:id", updateSection);

// get subject with teacher
router.post("/:sectionId", assignTeacher);

// get homeroom teacher
router.post("/:sectionId/:teacherId", assignHomeRoomTeacher);

// get subject with teacher
router.get("/:acCurriculumId/:gradeId/:sectionId", getSectionSubject);

module.exports = router;