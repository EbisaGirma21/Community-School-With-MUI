const AcademicSessionModel = require("../models/AcademicSessionModel");
const AcademicCurriculum = require("../models/AcademicCurriculumModel");
const mongoose = require("mongoose");
const { format } = require("date-fns");

// get all AcademicSessions
const getAcademicSessions = async (req, res) => {
  const academicSessions = await AcademicSessionModel.find({}).sort({
    createdAt: -1,
  });
  const acSession = await Promise.all(
    academicSessions.map(async (academicSession) => {
      return {
        _id: academicSession._id,
        academicYear: academicSession.academicYear,
        registrationDate: dateFormating(academicSession.registrationDate),
        registrationDeadLine: dateFormating(
          academicSession.registrationDeadLine
        ),
        classStartDate: dateFormating(academicSession.classStartDate),
        classEndDate: dateFormating(academicSession.classEndDate),
      };
    })
  );

  res.status(200).json(acSession);
};

// get a single AcademicSession
const getAcademicSession = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such academicSession" });
  }
  const academicSession = await AcademicSessionModel.findById(id);

  const acSession = await Promise.all(
    academicSession.map(async (academicSession) => {
      return {
        _id: academicSession._id,
        academicYear: academicSession.academicYear,
        registrationDate: dateFormating(academicSession.registrationDate),
        registrationDeadLine: dateFormating(
          academicSession.registrationDeadLine
        ),
        classStartDate: dateFormating(academicSession.classStartDate),
        classEndDate: dateFormating(academicSession.classEndDate),
      };
    })
  );

  if (!acSession) {
    return res.status(404).json({ error: "No such academicSession" });
  }

  res.status(200).json(acSession);
};

// create a new AcademicSession
const createAcademicSession = async (req, res) => {
  const {
    academicYear,
    registrationDate,
    registrationDeadLine,
    classStartDate,
    classEndDate,
  } = req.body;

  let emptyFields = [];

  if (!academicYear) {
    emptyFields.push("academicYear");
  }
  if (!registrationDate) {
    emptyFields.push("registrationDate");
  }
  if (!registrationDeadLine) {
    emptyFields.push("registrationDeadLine");
  }
  if (!classStartDate) {
    emptyFields.push("classStartDate");
  }
  if (!classEndDate) {
    emptyFields.push("classEndDate");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }

  try {
    const academicSession = await AcademicSessionModel.create({
      academicYear,
      registrationDate,
      registrationDeadLine,
      classStartDate,
      classEndDate,
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
  const {
    academicYear,
    registrationDate,
    registrationDeadLine,
    classStartDate,
    classEndDate,
  } = req.body;

  let emptyFields = [];

  if (!academicYear) {
    emptyFields.push("academicYear");
  }
  if (!registrationDate) {
    emptyFields.push("registrationDate");
  }
  if (!registrationDeadLine) {
    emptyFields.push("registrationDeadLine");
  }
  if (!classStartDate) {
    emptyFields.push("classStartDate");
  }
  if (!classEndDate) {
    emptyFields.push("classEndDate");
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

const dateFormating = (date) => {
  const dates = new Date(date);
  const formattedDate = format(dates, "MMMM d, yyyy");
  return formattedDate;
};

module.exports = {
  getAcademicSessions,
  getAcademicSession,
  createAcademicSession,
  deleteAcademicSession,
  updateAcademicSession,
};
