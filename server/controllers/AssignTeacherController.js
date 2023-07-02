const Section = require("../models/SectionModel");
const AcademicCurriculum = require("../models/AcademicCurriculumModel");
const Curriculum = require("../models/CurriculumModel");
const Module = require("../models/ModuleModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");

// get  Sections
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

// assigning teacher
const assignTeacher = (req, res) => {
  const { sectionId } = req.params;
  const { subjectId, teacherId } = req.body;
  const section = Section.findOneAndUpdate(
    {
      _id: sectionId,
      teachers: {
        $elemMatch: { subject: subjectId },
      },
    },
    {
      $set: { "teachers.$.teacher": teacherId },
    },
    { new: true }
  )
    .then((updatedSection) => {
      if (updatedSection) {
      } else {
        console.log("Section or subject not found.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  res.status(200).json(section);
};

// home room teacher assign
const assignHomeRoomTeacher = async (req, res) => {
  const { sectionId, teacherId } = req.params;
  const section = await Section.findByIdAndUpdate(
    { _id: sectionId },
    { homeRoomTeacher: teacherId }
  );
  res.status(200).json(section);
};

// get section subject
const getSectionSubject = async (req, res) => {
  const { acCurriculumId, gradeId, sectionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(sectionId)) {
    return res.status(404).json({ error: "No such section" });
  }

  const section = await Section.findById(sectionId);
  // Find the curriculum by curriculumId
  const academicCurriculum = await AcademicCurriculum.findById(acCurriculumId);

  // Find the curriculum by curriculumId
  const curriculum = await Curriculum.findById(academicCurriculum.curriculum);
  if (!curriculum) {
    return res.status(404).json({
      status: "Failed",
      message: "Curriculum not found",
    });
  }

  // Find the grade in the curriculum by gradeId
  const grade = curriculum.grades.find(
    (grade) => grade._id.toString() === gradeId
  );
  if (!grade) {
    return res.status(404).json({
      status: "Failed",
      message: "Grade not found",
    });
  }

  // Retrieve subjects with module information
  const subjectData = await Promise.all(
    section.teachers.map(async (teacher) => {
      const subjects = grade.subjects.find((subject) =>
        subject._id.equals(teacher.subject)
      );
      const mudeleId = subjects.module._id;
      const module = await Module.findById(mudeleId.toString());
      const user = await User.findById(teacher.teacher);

      return {
        _id: teacher.subject,
        teacherName: user
          ? user.gender === "Male"
            ? `Mr ${user.firstName} ${user.middleName}`
            : `Mrs ${user.firstName} ${user.middleName}`
          : "TBA",
        moduleId: mudeleId,
        subjectLoad: subjects.subject_load,
        moduleTitle: module ? module.moduleTitle : "null",
      };
    })
  );
  res.status(200).json(subjectData);
};

module.exports = {
  getSection,
  getSectionSubject,
  assignTeacher,
  assignHomeRoomTeacher,
};
