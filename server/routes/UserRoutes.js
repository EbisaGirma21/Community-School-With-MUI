const express = require("express");

// controller functions
const {
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  createOtherUser,
  getFamily,
  changePassword,
} = require("../controllers/UserController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// login route
router.post(
  "/login",

  loginUser
);

// GET all users (requires authentication)
router.get("/", getUsers);

// GET a single user (requires authentication)
router.get("/:id", getUser);

// POST a new Student
router.post("/", createOtherUser);

// DELETE a user (requires authentication)
router.delete("/:id", deleteUser);

// UPDATE a user (requires authentication)
router.patch("/:id", updateUser);

router.post("/change-password", changePassword);

module.exports = router;
