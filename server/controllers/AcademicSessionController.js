const AcademicSessionModel = require("../models/AcademicSessionModel");
const AcademicCurriculum = require("../models/AcademicCurriculumModel");
const mongoose = require("mongoose");

// get all AcademicSessions
const getAcademicSessions = async (req, res) => {
  const academicSessions = await AcademicSessionModel.find({}).sort({
    createdAt: -1,
  });
  res.status(200).json(academicSessions);
};

// get a single AcademicSession
const getAcademicSession = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such academicSession" });
  }
  const academicSession = await AcademicSessionModel.findById(id);

  if (!academicSession) {
    return res.status(404).json({ error: "No such academicSession" });
  }

  res.status(200).json(academicSession);
};

// create a new AcademicSession
const createAcademicSession = async (req, res) => {
  const { academicYear } = req.body;

  let emptyFields = [];

  if (!academicYear) {
    emptyFields.push("academicYear");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }

  try {
    const academicSession = await AcademicSessionModel.create({
      academicYear,
    });
    res.status(200).json(academicSession);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a AcademicSession
const deleteAcademicSession = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such AcademicSession" });
  }
  const exist = await AcademicCurriculum.findOne({ academicSession: id });
  if (exist) {
    return res.status(405).json({
      error:
        "Deletion is not allowed once Academic Curriculum registered on it!",
    });
  }

  const academicSession = await AcademicSessionModel.findOneAndDelete({
    _id: id,
  });

  if (!academicSession) {
    return res.status(400).json({ error: "No such AcademicSession" });
  }

  res.status(200).json(academicSession);
};

// update a AcademicSession
const updateAcademicSession = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such AcademicSession" });
  }
  const { academicYear } = req.body;

  let emptyFields = [];

  if (!academicYear) {
    emptyFields.push("academicYear");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }

  const academicSession = await AcademicSessionModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!academicSession) {
    return res.status(400).json({ error: "No such AcademicSession" });
  }

  res.status(200).json(academicSession);
};

module.exports = {
  getAcademicSessions,
  getAcademicSession,
  createAcademicSession,
  deleteAcademicSession,
  updateAcademicSession,
};
