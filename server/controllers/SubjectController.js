const Curriculum = require("../models/CurriculumModel");
const Module = require("../models/ModuleModel");

// All subject in specific grade
const getSubjects = async (req, res) => {
  try {
    const curriculumId = req.params.curriculumId;
    const gradeId = req.params.gradeId;

    // Find the curriculum by curriculumId
    const curriculum = await Curriculum.findById(curriculumId);
    if (!curriculum) {
      return res.status(404).json({
        error: "Curriculum not found",
      });
    }

    // Find the grade in the curriculum by gradeId
    const grade = curriculum.grades.find(
      (grade) => grade._id.toString() === gradeId
    );
    if (!grade) {
      return res.status(404).json({
        error: "Grade not found",
      });
    }

    // Retrieve subjects with module information
    const subjects = await Promise.all(
      grade.subjects.map(async (subject) => {
        const module = await Module.findById(subject.module.toString());

        return {
          _id: subject._id,
          moduleId: subject.module,
          moduleTitle: module ? module.moduleTitle : null,
          subjectLoad: subject.subject_load,
          assessments: subject.assessment,
        };
      })
    );

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving subjects",
      error: error.error,
    });
  }
};

// to get the single subject
const getSubject = async (req, res) => {
  try {
    const curriculumId = req.params.curriculumId;
    const gradeId = req.params.gradeId;
    const subjectId = req.params.subjectId;

    // Find the curriculum by curriculumId
    const curriculum = await Curriculum.findById(curriculumId);
    if (!curriculum) {
      return res.status(404).json({
        error: "Curriculum not found",
      });
    }

    // Find the grade in the curriculum by gradeId
    const grade = curriculum.grades.find(
      (grade) => grade._id.toString() === gradeId
    );
    if (!grade) {
      return res.status(404).json({
        error: "Grade not found",
      });
    }

    // Find the subject in the grade by subjectId
    const subject = grade.subjects.find(
      (subject) => subject._id.toString() === subjectId
    );
    if (!subject) {
      return res.status(404).json({
        error: "Subject not found",
      });
    }

    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving subject",
      error: error.error,
    });
  }
};

// efficient subject adding code

const createSubject = async (req, res) => {
  try {
    const curriculumId = req.body.curriculumId;
    const gradeId = req.body.gradeId;
    const subjects = req.body.subjects;
    const subjectLoad = req.body.subjectLoad;

    let emptyFields = [];

    if (!subjects) {
      emptyFields.push("subjects");
    }
    if (!subjectLoad) {
      emptyFields.push("subjectLoad");
    }

    if (emptyFields.length > 0) {
      return res.status(400).json({ error: "Please fill in all the fields" });
    }

    const curriculum = await Curriculum.findById(curriculumId);
    if (!curriculum) {
      return res.status(404).json({ error: "Curriculum not found" });
    }

    const grade = curriculum.grades.find(
      (grade) => grade._id.toString() === gradeId
    );
    if (!grade) {
      return res.status(404).json({ error: "Grade not found" });
    }
    if (subjects.modules.length * subjectLoad > curriculum.totalMaximumLoad) {
      return res
        .status(400)
        .json({ error: "Subject load exceed the total load" });
    }
    for (let i = 0; i < subjects.modules.length; i++) {
      const module = await Module.findById(subjects.modules[i]);

      const newSubject = {
        module: subjects.modules[i],
        subjectName: module.moduleTitle,
        subject_load: subjectLoad,
      };

      grade.subjects.push(newSubject);
    }
    await curriculum.save();
    res.status(200).json(curriculum);
  } catch (error) {
    res.status(400).json({
      error: error.error,
    });
  }
};

// update subject by id
const updateSubject = async (req, res) => {
  try {
    const curriculumId = req.params.curriculumId;
    const gradeId = req.params.gradeId;
    const subjectId = req.params.subjectId;
    const subjectLoad = req.body.subjectLoad;

    // Find the curriculum by curriculumId
    const curriculum = await Curriculum.findById(curriculumId);
    if (!curriculum) {
      return res.status(404).json({
        error: "Curriculum not found",
      });
    }

    // Find the grade in the curriculum by gradeId
    const grade = curriculum.grades.find(
      (grade) => grade._id.toString() === gradeId
    );
    if (!grade) {
      return res.status(404).json({
        error: "Grade not found",
      });
    }

    // Find the subject in the grade by subjectId
    const subject = grade.subjects.find(
      (subject) => subject._id.toString() === subjectId
    );
    if (!subject) {
      return res.status(404).json({
        error: "Subject not found",
      });
    }

    // Update the subjectLoad with the provided value
    subject.subject_load = subjectLoad;
    // Save the updated curriculum
    await curriculum.save();

    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({
      error: "Error updating subject",
    });
  }
};

// delete subject with id
const deleteSubject = async (req, res) => {
  try {
    const curriculumId = req.params.curriculumId;
    const gradeId = req.params.gradeId;
    const subjectId = req.params.subjectId;

    // Find the curriculum by curriculumId
    const curriculum = await Curriculum.findById(curriculumId);
    if (!curriculum) {
      return res.status(404).json({
        error: "Curriculum not found",
      });
    }

    // Find the grade in the curriculum by gradeId
    const grade = curriculum.grades.find(
      (grade) => grade._id.toString() === gradeId
    );
    if (!grade) {
      return res.status(404).json({
        error: "Grade not found",
      });
    }
    // Find the grade in the curriculum by gradeId
    const subject = grade.subjects.find(
      (subject) => subject._id.toString() === subjectId
    );
    if (!subject) {
      return res.status(404).json({
        error: "Grade not found",
      });
    }
    if (
      subject.assessment.quiz ||
      subject.assessment.test ||
      subject.assessment.assignment ||
      subject.assessment.midExam ||
      subject.assessment.finalExam
    ) {
      return res.status(404).json({
        error: "Assessment already assigned",
      });
    }

    // Find the subject index in the grade by subjectId
    const subjectIndex = grade.subjects.findIndex(
      (subject) => subject._id.toString() === subjectId
    );
    if (subjectIndex === -1) {
      return res.status(404).json({
        error: "Subject not found",
      });
    }
    // Remove the subject from the grade
    const removedSubject = grade.subjects.splice(subjectIndex, 1)[0];

    // Save the updated curriculum
    await curriculum.save();

    res.status(200).json(removedSubject);
  } catch (error) {
    res.status(500).json({
      error: "Error deleting subject",
    });
  }
};

module.exports = {
  getSubjects,
  getSubject,
  createSubject,
  deleteSubject,
  updateSubject,
};
