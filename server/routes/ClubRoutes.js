const express = require("express");
const {
  createClub,
  getClubs,
  getClub,
  updateClub,
  deleteClub,
} = require("../controllers/ClubController");

const router = express.Router();

// GET all Clubs
router.get("/", getClubs);

// GET a single Club
router.get("/:id", getClub);

// POST a new Club
router.post("/", createClub);

// DELETE a Club
router.delete("/:id", deleteClub);

// UPDATE a Club
router.patch("/:id", updateClub);

module.exports = router;
