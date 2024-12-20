const express = require("express");
const {
  createStudent,
  createSeniorStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  getElligibleStudent,
  enrollStudents,
  getSpecificStudent,
  getStudentEnrollment,
  getMarksByStudentId,
  deregisterStudents,
} = require("../controllers/StudentController");
const { registerStudentsFromFile } = require("../controllers/CSVController");
const upload = require("../middleware/uplooad");
const {
  registerTransferStudentsFromFile,
} = require("../controllers/TransferCSVController");

const router = express.Router();

// GET all Students
router.get("/", getStudents);

// GET a single Student
router.get("/:id", getStudent);

// GET a single Student
router.get("/enrollment/:id", getStudentEnrollment);

// GET a single Student
router.get(
  "/single-mark/:gradeId/:sectionId/:semesterId/:id",
  getMarksByStudentId
);

// POST a new Student
router.post("/", createStudent);

// POST a new Student
router.post("/register-file", upload.single("file"), registerStudentsFromFile);

// // POST a new Student
// router.post(
//   "/register-transfer-file",
//   upload.single("file"),
//   registerTransferStudentsFromFile
// );

// POST a transfer Student
router.post("/senior", createSeniorStudent);

// DELETE a Student
router.delete("/:id", deleteStudent);

// Enroll Student
router.patch("/enroll", enrollStudents);

// Enroll Student
router.patch("/deregister", deregisterStudents);

// UPDATE a Student
router.patch("/:id", updateStudent);

// Get a  Elligible Student
router.get("/elligible/:gradeId", getElligibleStudent);

// Get a  Elligible Student
router.get(
  "/specificStudent/:academicYear/:academicCurriculum/:grade/:section",
  getSpecificStudent
);

module.exports = router;
