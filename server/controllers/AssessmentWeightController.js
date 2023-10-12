const Curriculum = require("../models/CurriculumModel");
const AcademicCurriculum = require("../models/AcademicCurriculumModel");
const Module = require("../models/ModuleModel");

// All assessmentWeight in specific grade
const getAssessmentWeights = async (req, res) => {
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
          quiz: subject.assessment.quiz,
          test: subject.assessment.test,
          assignment: subject.assessment.assignment,
          midExam: subject.assessment.midExam,
          finalExam: subject.assessment.finalExam,
        };
      })
    );

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error retrieving subjects",
      error: error.message,
    });
  }
};

// to get the single assessmentWeight
const getAssessmentWeight = async (req, res) => {
  try {
    const curriculumId = req.params.curriculumId;
    const gradeId = req.params.gradeId;
    const assessmentWeightId = req.params.assessmentWeightId;

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

    // Find the assessmentWeight in the grade by assessmentWeightId
    const assessmentWeight = grade.assessmentWeights.find(
      (assessmentWeight) =>
        assessmentWeight._id.toString() === assessmentWeightId
    );
    if (!assessmentWeight) {
      return res.status(404).json({
        status: "Failed",
        message: "AssessmentWeight not found",
      });
    }

    res.status(200).json({
      status: "Success",
      data: {
        assessmentWeight,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error retrieving assessmentWeight",
      error: error.message,
    });
  }
};

// efficient assessmentWeight adding code

const createAssessmentWeight = async (req, res) => {
  try {
    const { curriculumId, gradeId, subjects, weights } = req.body;

    const exist = await AcademicCurriculum.findOne({
      curriculum: curriculumId,
    });
    if (exist) {
      return res.status(405).json({
        error: "Curriculum already registered on academic curriculum",
      });
    }

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

    subjects.forEach((subjectId) => {
      const subject = grade.subjects.find(
        (subject) => subject._id.toString() === subjectId
      );
      if (subject) {
        subject.assessment = weights;
      }
    });

    await curriculum.save();

    res.status(200).json({
      status: "Success",
      message: "Assessment weights updated successfully",
      curriculum: curriculum,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error updating assessment weights",
      error: error.message,
    });
  }
};

// update assessmentWeight by id
const updateAssessmentWeight = async (req, res) => {
  try {
    const curriculumId = req.params.curriculumId;
    const gradeId = req.params.gradeId;
    const assessmentWeightId = req.params.assessmentWeightId;
    const assessmentWeightLoad = req.body.assessmentWeightLoad;

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

    // Find the assessmentWeight in the grade by assessmentWeightId
    const assessmentWeight = grade.assessmentWeights.find(
      (assessmentWeight) =>
        assessmentWeight._id.toString() === assessmentWeightId
    );
    if (!assessmentWeight) {
      return res.status(404).json({
        status: "Failed",
        message: "AssessmentWeight not found",
      });
    }

    // Update the assessmentWeightLoad with the provided value
    assessmentWeight.assessmentWeight_load = assessmentWeightLoad;
    // Save the updated curriculum
    await curriculum.save();

    res.status(200).json({
      status: "Success",
      updatedAssessmentWeight: assessmentWeight,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error updating assessmentWeight",
      error: error.message,
    });
  }
};

// delete assessmentWeight with id
const deleteAssessmentWeight = async (req, res) => {
  try {
    const curriculumId = req.params.curriculumId;
    const gradeId = req.params.gradeId;
    const assessmentWeightId = req.params.assessmentWeightId;

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

    // Find the assessmentWeight index in the grade by assessmentWeightId
    const assessmentWeightIndex = grade.assessmentWeights.findIndex(
      (assessmentWeight) =>
        assessmentWeight._id.toString() === assessmentWeightId
    );
    if (assessmentWeightIndex === -1) {
      return res.status(404).json({
        status: "Failed",
        message: "AssessmentWeight not found",
      });
    }

    // Remove the assessmentWeight from the grade
    const removedAssessmentWeight = grade.assessmentWeights.splice(
      assessmentWeightIndex,
      1
    )[0];

    // Save the updated curriculum
    await curriculum.save();

    res.status(200).json({
      status: "Success",
      deletedAssessmentWeight: removedAssessmentWeight,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error deleting assessmentWeight",
      error: error.message,
    });
  }
};

module.exports = {
  getAssessmentWeights,
  getAssessmentWeight,
  createAssessmentWeight,
  deleteAssessmentWeight,
  updateAssessmentWeight,
};
