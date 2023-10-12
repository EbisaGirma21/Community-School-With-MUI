const express = require("express");
const {
  createRequest,
  getRequests,
  getRequest,
  approveRequest,
  approveStudent,
} = require("../controllers/RequestController");
const router = express.Router();

// GET all Requests
router.get("/", getRequests);

// GET a single Request
router.get("/:id", getRequest);

// POST a new Request
router.post("/", createRequest);

// UPDATE a Request
router.patch("/:id", approveRequest);

// UPDATE a Request
router.patch("/", approveStudent);

module.exports = router;
