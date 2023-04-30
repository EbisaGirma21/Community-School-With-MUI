const CurriculumModel = require("../models/CurriculumModel");
const mongoose = require("mongoose");

// get all Curriculums
const getCurriculums = async (req, res) => {
  const curriculums = await CurriculumModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(curriculums);
};

// get a single Curriculum
const getCurriculum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such curriculum" });
  }
  const curriculum = await CurriculumModel.findById(id);

  if (!curriculum) {
    return res.status(404).json({ error: "No such curriculum" });
  }

  res.status(200).json(curriculum);
};

// create a new Curriculum
const createCurriculum = async (req, res) => {
  const {
    curriculumTitle,
    curriculumYear,
    stage,
    addmissionClassification,
    totalMaximumLoad,
    curriculumState,
  } = req.body;

  let emptyFields = [];

  if (!curriculumTitle) {
    emptyFields.push("curriculumTitle");
  }
  if (!curriculumYear) {
    emptyFields.push("curriculumYear");
  }
  if (!stage) {
    emptyFields.push("stage");
  }
  if (!addmissionClassification) {
    emptyFields.push("addmissionClassification");
  }
  if (!totalMaximumLoad) {
    emptyFields.push("totalMaximumLoad");
  }
  if (!curriculumState) {
    emptyFields.push("curriculumState");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const curriculum = await CurriculumModel.create({
      curriculumTitle,
      curriculumYear,
      stage,
      addmissionClassification,
      totalMaximumLoad,
      curriculumState,
    });
    res.status(200).json(curriculum);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Curriculum
const deleteCurriculum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Curriculum" });
  }

  const curriculum = await CurriculumModel.findOneAndDelete({ _id: id });

  if (!curriculum) {
    return res.status(400).json({ error: "No such Curriculum" });
  }

  res.status(200).json(curriculum);
};

// update a Curriculum
const updateCurriculum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Curriculum" });
  }

  const curriculum = await CurriculumModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!curriculum) {
    return res.status(400).json({ error: "No such Curriculum" });
  }

  res.status(200).json(curriculum);
};

module.exports = {
  getCurriculums,
  getCurriculum,
  createCurriculum,
  deleteCurriculum,
  updateCurriculum,
};
