const Mark = require("../models/MarkModel");
const User = require("../models/UserModel");

// get all Marks
const getMarks = async (req, res) => {
  const { gradeId, sectionId, semesterId } = req.params;
  const marks = await Mark.find({ section: sectionId }).sort({
    createdAt: -1,
  });

  const marksData = await Promise.all(
    marks.map(async (mark) => {
      const user = await User.findById(mark.student);
      const totalMarksBySubject = {};
      const results = mark.results.filter((result) => {
        return result._semesters.toString() == semesterId;
      });

      // Function to calculate the total mark by subject Id
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
        status: average >= 50 ? "Pass" : "Fail",
        ...totalMarksBySubject,
      };
    })
  );

  // Calculate rank
  marksData.forEach((mark) => {
    mark.rank = 1; // Default rank is 1
    marksData.forEach((otherMark) => {
      if (otherMark.average > mark.average) {
        mark.rank++;
      }
    });
  });

  res.status(200).json(marksData);
};

// get averege Marks
const getAverageMarks = async (req, res) => {
  const { gradeId, sectionId } = req.params;
  const marks = await Mark.find({ section: sectionId }).sort({
    createdAt: -1,
  });

  const marksData = await Promise.all(
    marks.map(async (mark) => {
      const user = await User.findById(mark.student);
      const totalMarksBySubject = {};
      let totalSemester = 0;
      let totalSubject = 0;

      // Iterate through all semesters for this student
      mark.results.forEach((semesterResult) => {
        semesterResult.result.forEach((resultItem) => {
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
        totalSemester++;
      });
      // Iterate through the totalMarksBySubject and divide each value by the totalSemester
      for (const key in totalMarksBySubject) {
        if (totalMarksBySubject.hasOwnProperty(key)) {
          totalMarksBySubject[key] = totalMarksBySubject[key] / totalSemester;
        }
        totalSubject++;
      }

      // totalMark and average mark calculation
      const totalMark = totalMarkResult(totalMarksBySubject);
      const average = totalAverageMark(totalMarksBySubject, totalSubject);

      return {
        ...mark._doc,
        firstName: user ? user.firstName : null,
        middleName: user ? user.middleName : null,
        lastName: user ? user.lastName : null,
        gender: user ? user.gender : null,
        totalMark,
        average,
        status: average >= 50 ? "Pass" : "Fail",
        ...totalMarksBySubject,
      };
    })
  );
  // Calculate rank
  marksData.forEach((mark) => {
    mark.rank = 1; // Default rank is 1
    marksData.forEach((otherMark) => {
      if (otherMark.average > mark.average) {
        mark.rank++;
      }
    });
  });

  res.status(200).json(marksData);
};
// marklist for each subject
const getMarkLists = async (req, res) => {
  const { gradeId, sectionId, subjectId, semesterId } = req.params;

  const marks = await Mark.find({ section: sectionId }).sort({
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

const getAverageMarkLists = async (req, res) => {
  const { gradeId, sectionId, subjectId } = req.params;
  const marks = await Mark.find({ section: sectionId }).sort({
    createdAt: -1,
  });

  const marksData = await Promise.all(
    marks.map(async (mark) => {
      const user = await User.findById(mark.student);

      // Merge all results for the subject across all semesters
      const allResults = mark.results.reduce(
        (accumulator, semester) => {
          const subjectResult = semester.result.find(
            (item) => item.subject.toString() === subjectId
          );

          if (subjectResult && subjectResult.assessment) {
            Object.keys(subjectResult.assessment).forEach((assessmentType) => {
              const assessment = subjectResult.assessment[assessmentType];
              if (assessment.status === "assigned") {
                accumulator[assessmentType].value += assessment.value;
                accumulator[assessmentType].count += 1;
              }
            });
          }

          return accumulator;
        },
        {
          quiz: { value: 0, count: 0 },
          test: { value: 0, count: 0 },
          assignment: { value: 0, count: 0 },
          midExam: { value: 0, count: 0 },
          finalExam: { value: 0, count: 0 },
        }
      );

      // Calculate the average for each assessment type
      const calculateAverage = (type) => {
        return allResults[type].count > 0
          ? allResults[type].value / allResults[type].count
          : null;
      };

      // calculating total mark of assessment
      const total =
        calculateAverage("quiz") +
        calculateAverage("test") +
        calculateAverage("assignment") +
        calculateAverage("midExam") +
        calculateAverage("finalExam");

      return {
        _id: mark._id,
        student: mark.student,
        firstName: user ? user.firstName : null,
        middleName: user ? user.middleName : null,
        lastName: user ? user.lastName : null,
        gender: user ? user.gender : null,
        subject: subjectId,
        quiz: calculateAverage("quiz"),
        test: calculateAverage("test"),
        assignment: calculateAverage("assignment"),
        midExam: calculateAverage("midExam"),
        finalExam: calculateAverage("finalExam"),
        totalMark: total, // Include the total mark in the result
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

const totalAverageMark = (mark, semester) => {
  let totalResult = 0;
  let subjectNumber = 0;
  for (key in mark) {
    totalResult += mark[key];
    subjectNumber += 1;
  }
  return totalResult / semester;
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
  getAverageMarks,
  getAverageMarkLists,
};
