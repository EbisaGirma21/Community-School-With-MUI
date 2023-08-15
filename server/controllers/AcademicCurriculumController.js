const AcademicCurriculumModel = require("../models/AcademicCurriculumModel");
const mongoose = require("mongoose");
const Curriculum = require("../models/CurriculumModel");
const AcademicSession = require("../models/AcademicSessionModel");

// get all AcademicCurriculums
const getAcademicCurriculums = async (req, res) => {
  try {
    const academicCurriculums = await AcademicCurriculumModel.find({}).sort({
      createdAt: -1,
    });

    // Retrieve academic with curriculum information
    const acCurriculums = await Promise.all(
      academicCurriculums.map(async (academicCurriculum) => {
        const curriculum = await Curriculum.findById(
          academicCurriculum.curriculum.toString()
        );
        const academicSession = await AcademicSession.findById(
          academicCurriculum.academicSession.toString()
        );
        return {
          _id: academicCurriculum._id,
          academicSession: academicCurriculum.academicSession,
          curriculumId: curriculum ? curriculum._id : null,
          curriculumTitle: curriculum ? curriculum.curriculumTitle : null,
          maxSemester: academicCurriculum.maxSemester,
          academicYear: academicSession.academicYear,
        };
      })
    );

    res.status(200).json(acCurriculums);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
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
  const curriculum = await Curriculum.findById(
    academicCurriculum.curriculum.toString()
  );
  const acCurriculum = {
    _id: academicCurriculum._id,
    academicSession: academicCurriculum.academicSession,
    curriculumId: curriculum ? curriculum._id : null,
    curriculumTitle: curriculum ? curriculum.curriculumTitle : null,
    maxSemester: academicCurriculum.maxSemester,
  };

  res.status(200).json(acCurriculum);
};

// get AcademicCurriculum By Year
const getAcademicCurriculumByYear = async (req, res) => {
  const { acYear } = req.params;
  if (!mongoose.Types.ObjectId.isValid(acYear)) {
    return res.status(404).json({ error: "No such academicCurriculum" });
  }
  const academicCurriculums = await AcademicCurriculumModel.find({
    academicSession: acYear,
  });

  if (!academicCurriculums) {
    return res.status(404).json([]);
  }

  const acCurriculums = await Promise.all(
    academicCurriculums.map(async (academicCurriculum) => {
      const curriculum = await Curriculum.findById(
        academicCurriculum.curriculum.toString()
      );

      return {
        _id: academicCurriculum._id,
        academicSession: academicCurriculum.academicSession,
        curriculumId: curriculum ? curriculum._id : null,
        curriculumTitle: curriculum
          ? `${curriculum.curriculumTitle} ${curriculum.curriculumYear} (${curriculum.stage})`
          : null,
        maxSemester: academicCurriculum.maxSemester,
      };
    })
  );

  res.status(200).json(acCurriculums);
};

// create a new AcademicCurriculum
const createAcademicCurriculum = async (req, res) => {
  const { academicSession, curriculum, maxSemester } = req.body;

  if (!academicSession || !curriculum || !maxSemester) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields" });
  }

  try {
    const academicCurriculum = await AcademicCurriculumModel.create({
      academicSession,
      curriculum,
      maxSemester,
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
    return res.status(400).json({ error: "Invalid AcademicCurriculum ID" });
  }
  try {
    const academicCurriculum = await AcademicCurriculumModel.findOneAndDelete({
      _id: id,
    });
    if (!academicCurriculum) {
      return res.status(404).json({ error: "AcademicCurriculum not found" });
    }
    res.status(204).json(academicCurriculum);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete AcademicCurriculum" });
  }
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
  getAcademicCurriculumByYear,
  createAcademicCurriculum,
  deleteAcademicCurriculum,
  updateAcademicCurriculum,
};
