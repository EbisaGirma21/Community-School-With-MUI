const Mark = require("../models/MarkModel");
const MarkModel = require("../models/MarkModel");
const User = require("../models/UserModel");

// get all Marks
const getMarks = async (req, res) => {
  const { semesterId } = req.params;
  const marks = await MarkModel.find({}).sort({
    createdAt: -1,
  });

  const marksData = await Promise.all(
    marks.map(async (mark) => {
      const user = await User.findById(mark.student);
      const totalMarksBySubject = {};
      const results = mark.results.filter((result) => {
        return result._semesters.toString() == semesterId;
      });

      console.log(semesterId);
      // function to assign total mark by subject Id
      results[0].result.forEach((resultItem) => {
        const subjectId = resultItem.subject.toString();
        const assessment = resultItem.assessment;
        const totalMarks = Object.values(assessment).reduce(
          (acc, curr) => acc + (curr.value || 0),
          0
        );

        if (totalMarksBySubject[subjectId]) {
          totalMarksBySubject[subjectId] += totalMarks;
        } else {
          totalMarksBySubject[subjectId] = totalMarks;
        }
      });

      const totalMark = totalMarkResult(totalMarksBySubject);
      const average = averageResult(totalMarksBySubject);

      return {
        ...mark._doc,
        firstName: user ? user.firstName : null,
        middleName: user ? user.middleName : null,
        lastName: user ? user.lastName : null,
        gender: user ? user.gender : null,
        totalMark,
        average,
        ...totalMarksBySubject,
      };
    })
  );

  res.status(200).json(marksData);
};
const getMarkLists = async (req, res) => {
  const { subjectId, semesterId } = req.params;

  const marks = await MarkModel.find({}).sort({
    createdAt: -1,
  });
  const marksData = await Promise.all(
    marks.map(async (mark) => {
      const user = await User.findById(mark.student);

      const filteredSemester = mark.results.filter((item) => {
        return item._semesters.toString() === semesterId;
      });

      const filteredResult = filteredSemester[0].result.filter((item) => {
        return item.subject.toString() === subjectId;
      });
      console.log(filteredSemester[0]._semesters.toString());
      // Calculate the total mark by summing all assessment values
      const totalMark = Object.values(filteredResult[0].assessment)
        .filter((assessment) => assessment.status === "assigned")
        .reduce((acc, assessment) => acc + assessment.value, 0);

      return {
        _id: mark._id,
        student: mark.student,
        firstName: user ? user.firstName : null,
        middleName: user ? user.middleName : null,
        lastName: user ? user.lastName : null,
        gender: user ? user.gender : null,
        subject: filteredResult[0].subject,
        _semesters: filteredSemester[0]._semesters.toString(),
        quiz:
          filteredResult[0].assessment.quiz.status === "assigned"
            ? filteredResult[0].assessment.quiz.value
            : null,
        test:
          filteredResult[0].assessment.quiz.status === "assigned"
            ? filteredResult[0].assessment.test.value
            : null,
        assignment:
          filteredResult[0].assessment.quiz.status === "assigned"
            ? filteredResult[0].assessment.assignment.value
            : null,
        midExam:
          filteredResult[0].assessment.quiz.status === "assigned"
            ? filteredResult[0].assessment.midExam.value
            : null,
        finalExam:
          filteredResult[0].assessment.quiz.status === "assigned"
            ? filteredResult[0].assessment.finalExam.value
            : null,
        totalMark,
      };
    })
  );

  res.status(200).json(marksData);
};

const addSubjectMarks = async (req, res) => {
  const { updatedMark } = req.body;
  try {
    await Promise.all(
      updatedMark.map(async (data) => {
        const {
          _id,
          student,
          subject,
          _semesters,
          middleName,
          firstName,
          lastName,
          gender,
          isNew,
          ...assessment
        } = data;

        // Find the curriculum by curriculumId
        const studentMark = await Mark.findById(_id);

        // Find the grade in the curriculum by gradeId
        const resultSemester = studentMark.results.find(
          (result) => result._semesters.toString() === _semesters
        );

        // Find the subject in the grade by subjectId
        const subjectResult = resultSemester.result.find(
          (result) => result.subject.toString() === subject
        );
        // Update the result array for the specific subject and student

        const updatedResult = Object.keys(assessment).reduce((acc, key) => {
          acc[key] = {
            value: assessment[key] ? assessment[key] : 0,
            status: "assigned",
          };
          return acc;
        }, {});

        // updating subject
        subjectResult.assessment = updatedResult;
        await studentMark.save();

        res.status(200).json(subjectResult);
      })
    );
  } catch (error) {
    throw new Error("Error updating marks: " + error.message);
  }
};

const totalMarkResult = (mark) => {
  let totalResult = 0;
  for (key in mark) {
    totalResult += mark[key];
  }
  return totalResult;
};

const averageResult = (mark) => {
  let totalResult = 0;
  let subjectNumber = 0;
  for (key in mark) {
    totalResult += mark[key];
    subjectNumber += 1;
  }
  return totalResult / subjectNumber;
};

module.exports = {
  getMarks,
  getMarkLists,
  addSubjectMarks,
};
