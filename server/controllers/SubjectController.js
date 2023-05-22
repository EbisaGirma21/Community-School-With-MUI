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
    const subjects = await Promise.all(
      grade.subjects.map(async (subject) => {
        const module = await Module.findById(subject.module.toString());
        return {
          _id: subject._id,
          moduleId: subject.module,
          moduleTitle: module ? module.moduleTitle : null,
          subjectLoad: subject.subject_load,
        };
      })
    );

    res.status(200).json({
      status: "Success",
      data: {
        subjects,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error retrieving subjects",
      error: error.message,
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

    // Find the subject in the grade by subjectId
    const subject = grade.subjects.find(
      (subject) => subject._id.toString() === subjectId
    );
    if (!subject) {
      return res.status(404).json({
        status: "Failed",
        message: "Subject not found",
      });
    }

    res.status(200).json({
      status: "Success",
      data: {
        subject,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error retrieving subject",
      error: error.message,
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

    const curriculum = await Curriculum.findById(curriculumId);
    if (!curriculum) {
      return res.status(404).json({
        status: "Failed",
        message: "Curriculum not found",
      });
    }

    const grade = curriculum.grades.find(
      (grade) => grade._id.toString() === gradeId
    );
    if (!grade) {
      return res.status(404).json({
        status: "Failed",
        message: "Grade not found",
      });
    }
    for (let i = 0; i < subjects.modules.length; i++) {
      const newSubject = {
        module: subjects.modules[i],
        subject_load: subjectLoad,
      };

      grade.subjects.push(newSubject);
    }

    await curriculum.save();

    res.status(201).json({
      status: "Success",
      message: "Subjects created successfully for the grade",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error creating subjects for the grade",
      error: error.message,
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

    // Find the subject in the grade by subjectId
    const subject = grade.subjects.find(
      (subject) => subject._id.toString() === subjectId
    );
    if (!subject) {
      return res.status(404).json({
        status: "Failed",
        message: "Subject not found",
      });
    }

    // Update the subjectLoad with the provided value
    subject.subject_load = subjectLoad;
    // Save the updated curriculum
    await curriculum.save();

    res.status(200).json({
      status: "Success",
      updatedSubject: subject,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error updating subject",
      error: error.message,
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

    // Find the subject index in the grade by subjectId
    const subjectIndex = grade.subjects.findIndex(
      (subject) => subject._id.toString() === subjectId
    );
    if (subjectIndex === -1) {
      return res.status(404).json({
        status: "Failed",
        message: "Subject not found",
      });
    }

    // Remove the subject from the grade
    const removedSubject = grade.subjects.splice(subjectIndex, 1)[0];

    // Save the updated curriculum
    await curriculum.save();

    res.status(200).json({
      status: "Success",
      deletedSubject: removedSubject,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error deleting subject",
      error: error.message,
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
