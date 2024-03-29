const AcademicCurriculumModel = require("../models/AcademicCurriculumModel");
const mongoose = require("mongoose");
const Curriculum = require("../models/CurriculumModel");
const AcademicSession = require("../models/AcademicSessionModel");
const AcademicCurriculum = require("../models/AcademicCurriculumModel");
const Mark = require("../models/MarkModel");

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
          curriculumTitle: curriculum
            ? `${classic(curriculum.classification)} ${
                curriculum.curriculumYear
              } (${curriculum.stage})`
            : null,
          passTresholdAverage: academicCurriculum.passTresholdAverage,
          maxSemester: academicCurriculum.maxSemester,
          academicYear: academicSession.academicYear,
          semesters: academicCurriculum.semesters,
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
    curriculumTitle: curriculum
      ? `${classic(curriculum.classification)} ${curriculum.curriculumYear} (${
          curriculum.stage
        })`
      : null,
    passTresholdAverage: academicCurriculum.passTresholdAverage,
    maxSemester: academicCurriculum.maxSemester,
    semesters: academicCurriculum.semesters,
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
          ? `${classic(curriculum.classification)} ${
              curriculum.curriculumYear
            } (${curriculum.stage})`
          : null,
        passTresholdAverage: academicCurriculum.passTresholdAverage,
        maxSemester: academicCurriculum.maxSemester,
        semesters: academicCurriculum.semesters,
      };
    })
  );

  res.status(200).json(acCurriculums);
};

// create a new AcademicCurriculum
const createAcademicCurriculum = async (req, res) => {
  const { academicSession, curriculum, passTresholdAverage, maxSemester } =
    req.body;

  if ((!academicSession || !curriculum || !maxSemester, !passTresholdAverage)) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields" });
  }

  try {
    const semesters = [];
    semestersOption = ["I", "II", "III", "IV", "V"];
    for (let i = 1; i <= maxSemester; i++) {
      semesters.push({
        _semesterLabel: semestersOption[i - 1],
      });
    }

    const academicCurriculum = await AcademicCurriculum.create({
      academicSession,
      curriculum,
      passTresholdAverage,
      maxSemester,
      semesters,
    });

    res.status(200).json(academicCurriculum);
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
};
// delete a AcademicCurriculum
const deleteAcademicCurriculum = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid AcademicCurriculum ID" });
  }
  try {
    const mark = await Mark.findOne({
      academicCurriculum: id,
    });

    if (mark) {
      return res
        .status(405)
        .json({ error: "Student Registered on these academic curriculum" });
    }

    const academicCurriculum = await AcademicCurriculumModel.findOneAndDelete({
      _id: id,
    });
    if (!academicCurriculum) {
      return res.status(404).json({ error: "AcademicCurriculum not found" });
    }
    res.status(200).json(academicCurriculum);
  } catch (error) {
    s;
    res.status(500).json({ error: "Failed to delete AcademicCurriculum" });
  }
};

const updateAcademicCurriculum = async (req, res) => {
  const { id } = req.params;
  const { curriculum, passTresholdAverage, maxSemester } = req.body;

  console.log(curriculum, passTresholdAverage, maxSemester);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such AcademicCurriculum" });
  }

  const mark = await Mark.findOne({
    academicCurriculum: id,
  });

  if (mark) {
    return res
      .status(405)
      .json({ error: "Student Registered on these academic curriculum" });
  }

  if (!curriculum || !maxSemester || !passTresholdAverage) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields" });
  }

  try {
    const updatedSemesters = [];
    const semestersOption = ["I", "II", "III", "IV", "V"];
    for (let i = 1; i <= maxSemester; i++) {
      updatedSemesters.push({
        _semesterLabel: semestersOption[i - 1],
      });
    }

    const academicCurriculum = await AcademicCurriculumModel.findOneAndUpdate(
      { _id: id },
      {
        curriculum: curriculum,
        passTresholdAverage: passTresholdAverage,
        maxSemester: maxSemester,
        semesters: updatedSemesters,
      },
      { new: true } // To return the updated document
    );

    if (!academicCurriculum) {
      return res.status(404).json({ error: "No such AcademicCurriculum" });
    }

    res.status(200).json(academicCurriculum);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// assigning classification
const classic = (key) => {
  const classific = [
    { key: "R", value: "Regular" },
    { key: "N", value: "Night" },
    { key: "D", value: "Distance" },
  ];
  const classificationObject = classific.find((item) => item.key === key);

  if (classificationObject) {
    return classificationObject.value;
  } else {
    return "Invalid key";
  }
};

module.exports = {
  getAcademicCurriculums,
  getAcademicCurriculum,
  getAcademicCurriculumByYear,
  createAcademicCurriculum,
  deleteAcademicCurriculum,
  updateAcademicCurriculum,
};
