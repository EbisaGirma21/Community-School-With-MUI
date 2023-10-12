const Section = require("../models/SectionModel");
const User = require("../models/UserModel");
const Student = require("../models/StudentModel");
const mongoose = require("mongoose");
const Mark = require("../models/MarkModel");
const AcademicCurriculum = require("../models/AcademicCurriculumModel");

// get all Sections
const getSections = async (req, res) => {
  const sections = await Section.find({}).sort({ sectionLabel: 1 });

  const sectionData = await Promise.all(
    sections.map(async (section) => {
      const user = await User.findById(section.homeRoomTeacher);
      const students = await Student.find({
        "currentEnrollement._section": section._id,
      });

      return {
        ...section._doc,
        home_room_teacher: user
          ? user.gender === "Male"
            ? `Mr ${user.firstName} ${user.middleName}`
            : `Mrs ${user.firstName} ${user.middleName}`
          : "TBA",
        noStudent: students.length,
      };
    })
  );

  res.status(200).json(sectionData);
};

// get a single Section
const getSection = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such section" });
  }
  const section = await Section.findById(id);

  if (!section) {
    return res.status(404).json({ error: "No such section" });
  }

  res.status(200).json(section);
};

// create a new Section
const createSection = async (req, res) => {
  const { sectionLabel, academicCurriculum, grade, subjects } = req.body;

  let emptyFields = [];

  if (!sectionLabel) {
    emptyFields.push("sectionLabel");
  }
  if (!academicCurriculum) {
    emptyFields.push("academicCurriculum");
  }
  if (!grade) {
    emptyFields.push("grade");
  }
  if (!subjects || !Array.isArray(subjects)) {
    emptyFields.push("subjects");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const acCurriculum = await AcademicCurriculum.findById(academicCurriculum);

  const semesters = [];

  for (let i = 0; i < acCurriculum.semesters.length; i++) {
    let status = i === 0 ? "ONP" : "REG";
    semesters.push({
      _semester: acCurriculum.semesters[i]._id,
      _status: status,
    });
  }

  try {
    const teachers = subjects.map((subject) => ({
      subject: subject,
    }));

    const section = await Section.create({
      sectionLabel,
      academicCurriculum,
      grade,
      semesters,
      teachers,
    });

    res.status(200).json(section);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Section
const deleteSection = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Section" });
  }
  const mark = await Mark.findOne({
    section: id,
  });
  if (mark) {
    return res
      .status(405)
      .json({ error: "Student Registered on these section" });
  }

  const section = await Section.findOneAndDelete({ _id: id });

  if (!section) {
    return res.status(400).json({ error: "No such Section" });
  }

  res.status(200).json(section);
};

// update a Section
const updateSection = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Section" });
  }

  const section = await Section.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!section) {
    return res.status(400).json({ error: "No such Section" });
  }

  res.status(200).json(section);
};

module.exports = {
  getSections,
  getSection,
  createSection,
  deleteSection,
  updateSection,
};
