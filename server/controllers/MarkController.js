const Mark = require("../models/MarkModel");
const MarkModel = require("../models/MarkModel");
const User = require("../models/UserModel");

// get all Marks
const getMarks = async (req, res) => {
  const marks = await MarkModel.find({}).sort({
    createdAt: -1,
  });

  const marksData = await Promise.all(
    marks.map(async (mark) => {
      const user = await User.findById(mark.student);
      const totalMarksBySubject = {};

      // function to assign total mark by subject Id
      mark.result.forEach((resultItem) => {
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
  const { subjectId } = req.params;

  const marks = await MarkModel.find({}).sort({
    createdAt: -1,
  });
  const marksData = await Promise.all(
    marks.map(async (mark) => {
      const user = await User.findById(mark.student);

      const filteredResult = mark.result.filter((item) => {
        return item.subject.toString() === subjectId;
      });
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
          middleName,
          firstName,
          lastName,
          gender,
          isNew,
          ...assessment
        } = data;

        // Update the result array for the specific subject and student

        const updatedResult = Object.keys(assessment).reduce((acc, key) => {
          acc[key] = {
            value: assessment[key] ? assessment[key] : 0,
            status: "assigned",
          };
          return acc;
        }, {});

        // Find the matching Mark document by its _id and update the result array
        await Mark.findOneAndUpdate(
          { _id, student, "result.subject": subject },
          { $set: { "result.$.assessment": updatedResult } }
        );
      })
    );

    return "Marks updated successfully";
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
