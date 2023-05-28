const express = require("express");
const {
  createSection,
  getSections,
  getSection,
  updateSection,
  deleteSection,
} = require("../controllers/SectionController");

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

module.exports = router;
