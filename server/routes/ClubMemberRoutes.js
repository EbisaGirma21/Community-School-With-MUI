const express = require("express");
const {
  createClubMember,
  getClubMembers,
  getClubMember,
  updateClubMember,
  deleteClubMember,
} = require("../controllers/ClubMemberController");

const router = express.Router();

// GET all Clubs
router.get("/", getClubMembers);

// GET a single Club
router.get("/:id", getClubMember);

// POST a new Club
router.post("/", createClubMember);

// DELETE a Club
router.delete("/:id", deleteClubMember);

// UPDATE a Club
router.patch("/:id", updateClubMember);

module.exports = router;
