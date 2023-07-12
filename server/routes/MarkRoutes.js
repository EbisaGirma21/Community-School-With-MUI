const express = require("express");
const { getMarks } = require("../controllers/MarkController");

const router = express.Router();

// GET all Marks
router.get("/", getMarks);

module.exports = router;
