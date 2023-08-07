const CurriculumModel = require("../models/CurriculumModel");
const mongoose = require("mongoose");
const GradeModel = require("../models/GradeModel");
const AcademicCurriculum = require("../models/AcademicCurriculumModel");

// get all Curriculums
const getCurriculums = async (req, res) => {
  try {
    await init();
    const curriculums = await CurriculumModel.find({}).sort({ createdAt: -1 });

    const curriculumsWithSubjectCount = curriculums.map((curriculum) => {
      const subjectCount = curriculum.grades.reduce((count, grade) => {
        return count + grade.subjects.length;
      }, 0);

      return {
        ...curriculum.toObject(),
        subjectCount,
      };
    });

    res.status(200).json({
      status: "Success",
      data: {
        curriculums: curriculumsWithSubjectCount,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed to retrieve curriculums",
      message: err,
    });
  }
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
  res.status(200).json({
    status: "Success",
    data: {
      curriculum: curriculum,
    },
  });
};

// create a new Curriculum
const createCurriculum = async (req, res) => {
  try {
    const curriculum = new CurriculumModel(req.body);
    if (isValid(curriculum) === true) {
      await PrepareGrades(curriculum);
      await curriculum.save();

      res.status(201).json({
        status: "Success",
        data: {
          curriculum,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed to create academic Session",
      message: err,
    });
    console.log(err);
  }
};

// delete a Curriculum
const deleteCurriculum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such AcademicSession" });
  }
  const exist = await AcademicCurriculum.findOne({ curriculum: id });
  if (exist) {
    return res.status(405).json({
      error:
        "Deletion is not allowed once Academic Curriculum registered on it!",
    });
  }

  const curriculum = await CurriculumModel.findOneAndDelete({
    _id: id,
  });
  if (!curriculum) {
    return res.status(400).json({ error: "No such Curriculum" });
  }

  res.status(200).json(curriculum);
};

// update a Curriculum
const updateCurriculum = async (req, res) => {
  try {
    const curriculum = new CurriculumModel(req.body);
    const old_curriculum = await CurriculumModel.findById(req.params.id);
    if (isValid(curriculum) === true) {
      if (old_curriculum.stage != curriculum.stage) {
        await UpdateGrades(updatedCurriculum);
      }
      const updatedCurriculum = await CurriculumModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "Success",
        data: {
          updatedCurriculum,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed to Update Curriculum",
      message: err,
    });
  }
};

const getSubjectCount = (curriculum) => {
  let subjectCount = 0;

  curriculum.grades.forEach((grade) => {
    subjectCount += grade.subjects.length;
  });

  return subjectCount;
};

function isValid(curriculum) {
  if (curriculum.stage === "KG" && curriculum.classification != "R") {
    return false;
  }
  return true;
}

// Grade Preparation
async function PrepareGrades(curriculum) {
  let grades = await GradeModel.find({ stage: curriculum.stage });
  curriculum["grades"] = grades;
}

async function UpdateGrades(curriculum) {
  let grades = await GradeModel.find({ stage: curriculum.stage });
  await CurriculumModel.updateOne(
    { _id: curriculum._id },
    { $set: { grades: grades } },
    { new: true, runValidators: true }
  );
}

async function init() {
  let grades = await GradeModel.find({});
  if (grades.length === 0) {
    grades = [
      { stage: "KG", level: 1, branch: "GEN" },
      { stage: "KG", level: 2, branch: "GEN" },
      { stage: "KG", level: 3, branch: "GEN" },
      { stage: "PRM-I", level: 1, branch: "GEN" },
      { stage: "PRM-I", level: 2, branch: "GEN" },
      { stage: "PRM-I", level: 3, branch: "GEN" },
      { stage: "PRM-I", level: 4, branch: "GEN" },
      { stage: "PRM-II", level: 5, branch: "GEN" },
      { stage: "PRM-II", level: 6, branch: "GEN" },
      { stage: "PRM-II", level: 7, branch: "GEN" },
      { stage: "PRM-II", level: 8, branch: "GEN" },
      { stage: "SEC", level: 9, branch: "GEN" },
      { stage: "SEC", level: 10, branch: "GEN" },
      { stage: "PREP", level: 11, branch: "NAT" },
      { stage: "PREP", level: 11, branch: "SOC" },
      { stage: "PREP", level: 12, branch: "NAT" },
      { stage: "PREP", level: 12, branch: "SOC" },
    ];
    await GradeModel.insertMany(grades);
  }
}

module.exports = {
  getCurriculums,
  getCurriculum,
  createCurriculum,
  deleteCurriculum,
  updateCurriculum,
  getSubjectCount,
};
