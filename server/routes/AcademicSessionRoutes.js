const express = require("express");
const {
  createAcademicSession,
  getAcademicSessions,
  getAcademicSession,
  updateAcademicSession,
  deleteAcademicSession,
} = require("../controllers/AcademicSessionController");

const router = express.Router();

// GET all AcademicSessions
router.get("/", getAcademicSessions);

// GET a single AcademicSession
router.get("/:id", getAcademicSession);

// POST a new AcademicSession
router.post("/", createAcademicSession);

// DELETE a AcademicSession
router.delete("/:id", deleteAcademicSession);

// UPDATE a AcademicSession
router.patch("/:id", updateAcademicSession);

module.exports = router;
