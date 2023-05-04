const express = require("express");
const {
  createModule,
  getModules,
  getModule,
  updateModule,
  deleteModule,
} = require("../controllers/ModuleController");

const router = express.Router();

// GET all Modules
router.get("/", getModules);

// GET a single Module
router.get("/:id", getModule);

// POST a new Module
router.post("/", createModule);

// DELETE a Module
router.delete("/:id", deleteModule);

// UPDATE a Module
router.patch("/:id", updateModule);

module.exports = router;
