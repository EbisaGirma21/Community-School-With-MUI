const mongoose = require("mongoose");
const Request = require("../models/RequestModels");
const AcademicCurriculum = require("../models/AcademicCurriculumModel");
const AcademicSession = require("../models/AcademicSessionModel");
const Grade = require("../models/GradeModel");
const Section = require("../models/SectionModel");
const Curriculum = require("../models/CurriculumModel");
const Student = require("../models/StudentModel");

const getRequests = async (req, res) => {
  const requests = await Request.find({}).sort({
    createdAt: -1,
  });
  const request = await Promise.all(
    requests.map(async (reqst) => {
      const academicCurriculum = await AcademicCurriculum.findById(
        reqst.requestedAcademicCurriculum
      );
      const curriculum = await Curriculum.findById(
        academicCurriculum.curriculum
      );
      const grades = await Grade.findById(reqst.requestedGrade);
      const sections = await Section.findById(reqst.requestedSection);
      const semesters = academicCurriculum.semesters.filter((semester) => {
        return semester._id.toString() === reqst.requestedSemester.toString();
      });
      return {
        ...reqst._doc,
        acCurriculum: academicCurriculum
          ? `${curriculum.classification} ${curriculum.curriculumYear} (${curriculum.stage})`
          : null,
        grade: grades
          ? grades.stage === "KG"
            ? `KG - ${grades.level}`
            : `Grade - ${grades.level}`
          : null,
        section: sections.sectionLabel,
        semester: semesters[0]._semesterLabel,
        status:
          reqst.requestStatus === "notApproved" ? "Not Approved" : "Approved",
      };
    })
  );

  res.status(200).json(request);
};

const getRequest = async (req, res) => {
  const request = await Request.find({}).sort({
    createdAt: -1,
  });
  res.status(200).json(request);
};

// create requests
const createRequest = async (req, res) => {
  const {
    requestedAcademicCurriculum,
    requestedGrade,
    requestedSection,
    requestedSemester,
    requestType,
  } = req.body;

  const exist = await Request.find({});

  // Assuming exist is an array of objects representing requests
  const exists = exist.some(
    (item) =>
      item.requestedSemester.equals(requestedSemester) &&
      item.requestedSection.equals(requestedSection) &&
      item.requestType === requestType
  );
  if (exists) {
    res.status(409).json({ error: "Request already sent" });
  } else {
    // Process the request because it's not a duplicate

    const requestStatus = "notApproved";
    try {
      const request = await Request.create({
        requestedAcademicCurriculum,
        requestedGrade,
        requestedSection,
        requestedSemester,
        requestType,
        requestStatus,
      });

      res.status(200).json(request);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const approveStudent = async (req, res) => {
  const { studentResult } = req.body;

  // check if all semseters are ended
  const sections = await Section.findById(studentResult[0].section);

  const isEnded =
    sections.semesters[sections.semesters.length - 1]._status !== "CMP"
      ? false
      : true;

  if (!isEnded) {
    return res.status(405).json({ message: "The last semester not ended" });
  }

  // check if already approved by usning student on index 0
  studentInfo = await Student.findById(studentResult[0].student);

  const lastEnrollment =
    studentInfo.enrollment_history[studentInfo.enrollment_history.length - 1];
  const areTheyApproved =
    studentInfo.enrollment_history.length !== 0
      ? alreadyEnrolled(lastEnrollment, studentInfo.currentEnrollement)
      : false;

  if (areTheyApproved) {
    return res
      .status(409)
      .json({ message: "Students result already approved" });
  }

  const academicCurriculum = await AcademicCurriculum.findById(
    studentResult[0].academicCurriculum
  );
  // academic session from academic curriculum
  const academicSession = await AcademicSession.findById(
    academicCurriculum.academicSession
  );

  // curriculum from academic Curriculum
  const curriculum = await Curriculum.findById(academicCurriculum.curriculum);

  // some constant for all student
  const academicYear = academicSession.academicYear;
  const grade = studentResult[0].grade;
  const acCurriculum = studentResult[0].academicCurriculum;
  const stage = curriculum.stage;
  const classification = curriculum.classification;
  const section = studentResult[0].section;

  try {
    await Promise.all(
      studentResult.map(async (students) => {
        if (!mongoose.Types.ObjectId.isValid(students.student)) {
          return res.status(400).json({ error: "No such Student" });
        }

        const seniorEnrollment = {
          _academicYear: academicYear,
          _academicCurriculum: acCurriculum,
          _grade: grade,
          _stage: stage,
          _classification: classification,
          _section: section,
          _totalMark: students.totalMark,
          _average: students.average,
          _status: students.status === "Pass" ? "PAS" : "FAL",
        };

        await Student.findOneAndUpdate(
          { _id: students.student },
          {
            $set: { currentEnrollement: seniorEnrollment },
            $push: { enrollment_history: seniorEnrollment },
          }
        );
      })
    );

    res.status(200).json({ message: "Students result approved successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const approveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the request exists and is not already approved
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    if (request.requestStatus === "approved") {
      return res.status(409).json({ error: "Request already approved" });
    }

    // update by checking the type
    if (request.requestType === "remarkRequest") {
      const section = await Section.findOneAndUpdate(
        {
          _id: request.requestedSection,
          "semesters._semester": request.requestedSemester,
        },
        { $set: { "semesters.$._status": "ONP" } }
      );
    } else if (request.requestType === "rosterApproval") {
      const section = await Section.findOneAndUpdate(
        {
          _id: request.requestedSection,
          "semesters._semester": request.requestedSemester,
        },
        { $set: { "semesters.$._status": "CMP" } }
      );

      // Find the index of the current semester
      const currentIndex = section.semesters.findIndex((semester) => {
        return (
          semester._semester.toString() === request.requestedSemester.toString()
        );
      });

      // Check if there is a next semester
      if (currentIndex < section.semesters.length - 1) {
        // Update the next semester's _status to 'ONP'
        const nextSemesterId = section.semesters[currentIndex + 1]._semester;
        await Section.updateOne(
          {
            _id: request.requestedSection,
            "semesters._semester": nextSemesterId,
          },
          { $set: { "semesters.$._status": "ONP" } }
        );
      }
    }

    // Update the request status
    await Request.findByIdAndUpdate(id, { requestStatus: "approved" });

    // returning the status
    res.status(200).json({ message: "Request approved successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const alreadyEnrolled = (enrollmentHistory, currentEnrollement) => {
  if (
    enrollmentHistory._academicCurriculum &&
    currentEnrollement._academicCurriculum.toString() ===
      enrollmentHistory._academicCurriculum.toString()
  ) {
    return true;
  }

  return false;
};

module.exports = {
  getRequests,
  getRequest,
  createRequest,
  approveRequest,
  approveStudent,
};
