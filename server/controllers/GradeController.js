const Grade = require("../models/GradeModel");

const getGrades = async (req, res) => {
  const grades = await Grade.find({}).sort({
    createdAt: -1,
  });
  try {
    res.status(200).json({
      status: "Success",
      data: {
        grades,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed to retrieve grades",
      message: err,
    });
  }
};

const getGrade = async (req, res) => {
  let grade;
  try {
    grade = await Grade.findById(req.params.id);
    if (grade == null) {
      return res.status(404).json({ message: "Cannot find grade" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.json(res.grade);
};

// grt grade by stage
const getGradesByStage = async (req, res) => {
  const { stage } = req.params;

  const grade = await Grade.find({
    stage,
  });
  if (!grade || grade.length === 0) {
    return res.status(404).json([]);
  }
  res.status(200).json(grade);
};

// create grades
const createGrade = async (req, res) => {
  const grade = new Grade(req.body);
  try {
    if (IsValid(grade) === true && IsPreviousGradeExist(grade) === true) {
      await grade.save();
      res.status(201).json({
        status: "Success",
        data: {
          grade,
        },
      });
    } else {
      res.status(202).json({
        status: "Success",
        message: "invalid grade",
      });
    }
  } catch (err) {
    res.status(205).json({
      status: "Failed to create academic Session",
      message: err,
    });
  }
};

const updateGrade = async (req, res) => {
  const grade = new Grade(req.body);
  try {
    if (IsValid(grade) === true && IsPreviousGradeExist(grade) === true) {
      const updatedGrade = await Grade.findByIdAndUpdate(
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
          updatedGrade,
        },
      });
    } else {
      res.status(202).json({
        status: "Success",
        message: "invalid grade",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed to Update Grade",
      message: err,
    });
  }
};

const deleteGrade = async (req, res) => {
  try {
    await Grade.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed to Delete Grade",
      message: err,
    });
  }
};

function IsValid(grade) {
  if (grade.stage != "PREP") {
    grade.branch = "GEN";
  }
  if (grade.stage === "KG" && grade.level > 3) {
    return false;
  }
  if (grade.stage === "PRM" && grade.level > 4) {
    return false;
  }
  if (grade.stage === "PRM-II" && (grade.level < 5 || grade.level > 8)) {
    return false;
  }
  if (grade.stage === "SEC" && (grade.level < 9 || grade.level > 10)) {
    return false;
  }
  if (grade.stage === "PREP" && grade.level < 11) {
    return false;
  }
  if (grade.stage === "PREP" && grade.branch === "GEN") {
    return false;
  }
  return true;
}

async function IsPreviousGradeExist(grade) {
  let level = grade.level;
  if (level === 1) {
    return true;
  } else if (grade.stage === "PRM-II" && grade.level === 4) {
    return true;
  } else if (grade.stage === "SEC" && grade.level === 9) {
    return true;
  } else if (grade.stage === "PREP" && grade.level === 11) {
    return true;
  } else {
    level = level - 1;
    return await Grade.exists({
      stage: grade.stage,
      level: level,
      branch: grade.branch,
    });
  }
}

module.exports = {
  getGrades,
  getGrade,
  getGradesByStage,
  createGrade,
  deleteGrade,
  updateGrade,
};
