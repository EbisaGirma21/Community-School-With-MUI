const AcademicCurriculumModel = require("../models/AcademicCurriculumModel");
const mongoose = require("mongoose");

// get all AcademicCurriculums
const getAcademicCurriculums = async (req, res) => {
  const academicCurriculums = await AcademicCurriculumModel.find({}).sort({
    createdAt: -1,
  });
  res.status(200).json(academicCurriculums);
};

// get a single AcademicCurriculum
const getAcademicCurriculum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such academicCurriculum" });
  }
  const academicCurriculum = await AcademicCurriculumModel.findById(id);

  if (!academicCurriculum) {
    return res.status(404).json({ error: "No such academicCurriculum" });
  }

  res.status(200).json(academicCurriculum);
};

// create a new AcademicCurriculum
const createAcademicCurriculum = async (req, res) => {
  const { academicSession, maxSemester, curriculum } = req.body;

  let emptyFields = [];

  if (!academicSession) {
    emptyFields.push("academicSession");
  }
  if (!maxSemester) {
    emptyFields.push("maxSemester");
  }
  if (!curriculum) {
    emptyFields.push("curriculum");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const academicCurriculum = await AcademicCurriculumModel.create({
      academicSession,
      maxSemester,
      curriculum,
    });
    res.status(200).json(academicCurriculum);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a AcademicCurriculum
const deleteAcademicCurriculum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such AcademicCurriculum" });
  }

  const academicCurriculum = await AcademicCurriculumModel.findOneAndDelete({
    _id: id,
  });

  if (!academicCurriculum) {
    return res.status(400).json({ error: "No such AcademicCurriculum" });
  }

  res.status(200).json(academicCurriculum);
};

// update a AcademicCurriculum
const updateAcademicCurriculum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such AcademicCurriculum" });
  }

  const academicCurriculum = await AcademicCurriculumModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!academicCurriculum) {
    return res.status(400).json({ error: "No such AcademicCurriculum" });
  }

  res.status(200).json(academicCurriculum);
};

module.exports = {
  getAcademicCurriculums,
  getAcademicCurriculum,
  createAcademicCurriculum,
  deleteAcademicCurriculum,
  updateAcademicCurriculum,
};
