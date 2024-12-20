const Student = require("../models/StudentModel");
const Grade = require("../models/GradeModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");
const { createUser, deleteUserById, updateUser } = require("./UserController");
const Mark = require("../models/MarkModel");
const AcademicCurriculum = require("../models/AcademicCurriculumModel");
const Curriculum = require("../models/CurriculumModel");
const { format } = require("date-fns");
const AcademicSession = require("../models/AcademicSessionModel");
const TransferStudent = require("../models/TranferstudentModel");

// get all Students
const getStudents = async (req, res) => {
  const students = await Student.find({});
  const student = await Promise.all(
    students.map(async (stud) => {
      const user = await User.findById(stud._id.toString());
      return {
        ...stud._doc,
        studentBirthDate: dateFormating(stud.birthDate),
        firstName: user ? user.firstName : null,
        middleName: user ? user.middleName : null,
        lastName: user ? user.lastName : null,
        gender: user ? user.gender : null,
        email: user ? user.email : null,
        role: user ? user.role : null,
      };
    })
  );
  res.status(200).json(student);
};

// get a single Student
const getStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: "No such student" });
    }
    const user = await User.findById(student._id.toString());
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get a single Student Enrollment
const getStudentEnrollment = async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid student ID" });
  }

  try {
    // Query and populate
    const student = await Student.findById(id)
      .populate("currentEnrollement._academicCurriculum") // Populate AcademicCurriculum
      .populate("currentEnrollement._grade") // Populate Grade
      .populate({
        path: "currentEnrollement._section", // Populate Section
        populate: {
          path: "homeRoomTeacher", // Populate homeRoomTeacher inside Section
          model: "User", // Model of the homeRoomTeacher (replace "User" if needed)
        },
      })
      .populate("enrollment_history._academicCurriculum") // Populate history AcademicCurriculum
      .populate("enrollment_history._grade") // Populate history Grade
      .populate("enrollment_history._section"); // Populate history Section

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Send populated data
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMarksByStudentId = async (req, res) => {
  const { gradeId, sectionId, semesterId, id } = req.params;
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

      const academicCurriculum = await AcademicCurriculum.findById(
        marks[0].academicCurriculum.toString()
      );

      return {
        ...mark._doc,
        firstName: user ? user.firstName : null,
        middleName: user ? user.middleName : null,
        lastName: user ? user.lastName : null,
        gender: user ? user.gender : null,
        totalMark,
        average,
        status:
          average >= academicCurriculum.passTresholdAverage ? "Pass" : "Fail",
        ...totalMarksBySubject,
      };
    })
  );

  // Filter the data for the specific student
  const studentMarksData = marksData.find(
    (mark) => mark.student.toString() === id
  );

  if (!studentMarksData) {
    return res.status(404).json({ message: "Student marks not found" });
  }

  // Add rank calculation if necessary
  studentMarksData.rank = 1;
  marksData.forEach((otherMark) => {
    if (otherMark.average > studentMarksData.average) {
      studentMarksData.rank++;
    }
  });

  res.status(200).json(studentMarksData);
};

// create a new Student

const createStudent = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    gender,
    email,
    role,
    birthDate,
    registrationType,
    familyFirstName,
    familyMiddleName,
    familyLastName,
    familyGender,
    familyEmail,
    familyPhoneNumber,
    familyAddress,
  } = req.body;

  let emptyFields = [];

  if (!firstName) emptyFields.push("firstName");
  if (!middleName) emptyFields.push("middleName");
  if (!lastName) emptyFields.push("lastName");
  if (!gender) emptyFields.push("gender");
  if (!role) emptyFields.push("role");
  if (!birthDate) emptyFields.push("birthDate");
  if (!registrationType) emptyFields.push("registrationType");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all the fields",
      emptyFields,
    });
  }

  const birthday = new Date(birthDate);
  const currentDate = new Date();
  const ageInMilliseconds = currentDate - birthday;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
  if (ageInYears < 4) {
    return res.status(400).json({
      error: "Student age is not eligible",
      emptyFields,
    });
  }

  try {
    const ethiopianYear = await AcademicSession.find();

    const lastStudent = await Student.findOne()
      .sort({ createdAt: -1 })
      .select("studentIdNumber");

    let nextSequence = 1;
    if (lastStudent && lastStudent.studentIdNumber) {
      const lastSequence = parseInt(
        lastStudent.studentIdNumber.split("/")[1],
        10
      );
      nextSequence = lastSequence + 1;
    }

    const formattedSequence = nextSequence.toString().padStart(4, "0");
    const studentIdNumber = `${registrationType}/${formattedSequence}/${
      ethiopianYear[0].academicYear % 100
    }`;

    const user = await createUser(
      firstName,
      middleName,
      lastName,
      gender,
      email,
      role,
      familyPhoneNumber,
      familyAddress
    );

    const family = await createUser(
      familyFirstName,
      familyMiddleName,
      familyLastName,
      familyGender,
      familyEmail,
      "family",
      familyPhoneNumber,
      familyAddress
    );

    const student = new Student({
      _id: user.user._id,
      birthDate,
      registrationType,
      studentIdNumber,
      family: family.user._id,
    });
    await student.save();

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create a transfer Student
const createSeniorStudent = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    gender,
    email,
    role,
    birthDate,
    registrationType,
    familyFirstName,
    familyMiddleName,
    familyLastName,
    familyGender,
    familyEmail,
    familyPhoneNumber,
    familyAddress,
    previousYear,
    previousStage,
    previousGrade,
    previousClassification,
    previousTotalMark,
    previousAverage,
    previousAcademicStatus,
    nameOfSchool,
    addressOfSchool,
    contactOfSchool,
    otherInfo,
  } = req.body;

  let emptyFields = [];

  if (!firstName) {
    emptyFields.push("firstName");
  }
  if (!middleName) {
    emptyFields.push("middleName");
  }
  if (!lastName) {
    emptyFields.push("lastName");
  }
  if (!gender) {
    emptyFields.push("gender");
  }

  if (!role) {
    emptyFields.push("role");
  }
  if (!birthDate) {
    emptyFields.push("birthDate");
  }
  if (!registrationType) {
    emptyFields.push("registrationType");
  }
  if (
    !familyFirstName ||
    !familyMiddleName ||
    !familyLastName ||
    !familyGender ||
    !familyEmail ||
    !familyPhoneNumber ||
    !familyAddress ||
    !previousYear ||
    !previousStage ||
    !previousGrade ||
    !previousClassification ||
    !previousTotalMark ||
    !previousAverage ||
    !previousAcademicStatus ||
    !nameOfSchool ||
    !addressOfSchool ||
    !contactOfSchool ||
    !otherInfo
  ) {
    emptyFields.push("familyInfo");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const ethiopianYear = await AcademicSession.find();

    const lastStudent = await Student.findOne()
      .sort({ createdAt: -1 })
      .select("studentIdNumber");

    let nextSequence = 1;
    if (lastStudent && lastStudent.studentIdNumber) {
      const lastSequence = parseInt(
        lastStudent.studentIdNumber.split("/")[1],
        10
      );
      nextSequence = lastSequence + 1;
    }

    const formattedSequence = nextSequence.toString().padStart(4, "0");
    const studentIdNumber = `${registrationType}/${formattedSequence}/${
      ethiopianYear[0].academicYear % 100
    }`;

    const seniorEnrollment = {
      _academicYear: previousYear,
      _grade: previousGrade,
      _stage: previousStage,
      _classification: previousClassification,
      _totalMark: previousTotalMark,
      _average: previousAverage,
      _status: previousAcademicStatus,
    };

    // create student
    const user = await createUser(
      firstName,
      middleName,
      lastName,
      gender,
      email,
      role,
      familyPhoneNumber,
      familyAddress
    );

    // add student information
    if (!user) {
      res.status(500).json({ error: "Failed to add user" });
    }

    // create student family
    const family = await createUser(
      familyFirstName,
      familyMiddleName,
      familyLastName,
      familyGender,
      familyEmail,
      "family",
      familyPhoneNumber,
      familyAddress
    );
    const student = new Student({
      _id: user.user._id,
      birthDate,
      studentIdNumber,
      registrationType,
      family: family.user._id,
      currentEnrollement: seniorEnrollment,
      enrollment_history: [seniorEnrollment],
    });

    await student.save();

    const transferstudent = new TransferStudent({
      _id: user.user._id,
      transferYear: previousYear,
      transferGrade: previousGrade,
      transferStage: previousStage,
      transferClassification: previousClassification,
      transferTotalMark: previousTotalMark,
      transferAverage: previousAverage,
      transferAcademicStatus: previousAcademicStatus,
      nameOfSchool,
      addressOfSchool,
      contactOfSchool,
      otherInfo,
    });

    await transferstudent.save();

    // add senior information

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Student
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Student" });
  }

  // geting  student
  const studentInfo = await Student.findById(id);

  // deleting student family
  const family = await deleteUserById(studentInfo.family);

  // deleting student
  const user = await deleteUserById(id);
  if (!user) {
    return res.status(400).json({ error: "No such Student" });
  }
  const student = await Student.findOneAndDelete({ _id: id });

  if (!student) {
    return res.status(400).json({ error: "No such Student" });
  }

  res.status(200).json(student);
};

// update a Student
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { firstName, middleName, lastName, gender, email, birthDate } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Student" });
  }
  const user = await updateUser(
    id,
    firstName,
    middleName,
    lastName,
    gender,
    email,
    role
  );
  if (!user) {
    return res.status(400).json({ error: "No such Student" });
  }
  const student = await Student.findOneAndUpdate(
    { _id: id },
    {
      birthDate,
    }
  );

  if (!student) {
    return res.status(400).json({ error: "No such Student" });
  }

  res.status(200).json(student);
};

const enrollStudents = async (req, res) => {
  const { elligibleStudent, gradeId, sectionId, acCurriculumId } = req.body;

  const newEnrollment = {
    _academicCurriculum: acCurriculumId,
    _grade: gradeId,
    _section: sectionId,
    status: "ONP",
  };
  const enrollHistory = {
    _status: "NEW",
  };

  try {
    // Find the academic curriculum
    const academicCurriculum = await AcademicCurriculum.findById(
      acCurriculumId
    );

    // curriculum
    const curriculum = await Curriculum.findById(academicCurriculum.curriculum);

    // Find the grade in the curriculum by gradeId
    const grade = curriculum.grades.find(
      (grade) => grade._id.toString() === gradeId
    );

    // Find the subjects in the grade by subjectIds
    const subjects = grade.subjects;

    await Promise.all(
      elligibleStudent.map(async (student) => {
        if (!mongoose.Types.ObjectId.isValid(student._id)) {
          return res.status(400).json({ error: "No such Student" });
        }

        // Creating result array with assigned assessments
        const resultArray = subjects.map((subject) => {
          const assessment = {};

          // Check if assessment type exists in the subject's assessment object
          Object.keys(subject.assessment).forEach((type) => {
            const value = subject.assessment[type];
            if (value > 0) {
              assessment[type] = {
                value: null,
                status: "assigned",
              };
            }
          });

          return {
            subject: subject._id,
            assessment: assessment,
          };
        });

        // array of semester
        const resultsArray = academicCurriculum.semesters.map((semester) => {
          return {
            _semesters: semester._id,
            result: resultArray,
          };
        });

        await Student.findOneAndUpdate(
          { _id: student._id },
          {
            $set: {
              currentEnrollement: newEnrollment,
            },
            $push: {
              enrollment_history: enrollHistory,
            },
          },
          { new: true }
        );

        await Mark.create({
          academicCurriculum: acCurriculumId,
          grade: gradeId,
          section: sectionId,
          student: student._id,
          results: resultsArray,
        });
      })
    );

    res.status(200).json({ message: "Students enrolled successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during enrollment" });
  }
};

const deregisterStudents = async (req, res) => {
  const { studentIds, acCurriculumId, gradeId, sectionId } = req.body;

  try {
    await Promise.all(
      studentIds.map(async (studentId) => {
        const student = await Student.findById(studentId);
        if (!student) {
          throw new Error(`Student with ID ${studentId} not found`);
        }

        // Find the enrollment history excluding "_status: 'NEW'"
        const previousEnrollmentHistory = student.enrollment_history.filter(
          (history) => history._status !== "NEW"
        );

        let updatedEnrollment = {};

        if (previousEnrollmentHistory.length > 0) {
          const recentHistory =
            previousEnrollmentHistory[previousEnrollmentHistory.length - 1];
          updatedEnrollment = {
            _academicYear: recentHistory?._academicYear,
            _academicCurriculum: recentHistory?._academicCurriculum,
            _grade: recentHistory?._grade,
            _stage: recentHistory?._stage,
            _classification: recentHistory?._classification,
            _totalMark: recentHistory?._totalMark,
            _average: recentHistory?._average,
            _status: recentHistory?._status,
          };
        } else {
          updatedEnrollment = null;
        }

        await Student.findByIdAndUpdate(
          studentId,
          {
            ...(updatedEnrollment
              ? { $set: { currentEnrollement: updatedEnrollment } } // Set to the recent enrollment
              : { $unset: { currentEnrollement: "" } }), // Unset if no previous enrollment
            $pull: { enrollment_history: { _status: "NEW" } }, // Remove the "NEW" entry
          },
          { new: true }
        );

        // Delete the related Mark record
        await Mark.deleteOne({
          academicCurriculum: acCurriculumId,
          grade: gradeId,
          section: sectionId,
          student: studentId,
        });
      })
    );

    res.status(200).json({ message: "Students deregistered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getElligibleStudent = async (req, res) => {
  const { gradeId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(gradeId)) {
    return res.status(400).json({ error: "No such grade" });
  }
  const grade = await Grade.findById({ _id: gradeId });
  const prevGrade = previousGrade(grade);
  if (prevGrade[0] === "null") {
    // students with no enrollment or failed in KG 1
    const students = await Student.find({
      $or: [
        {
          "currentEnrollement._grade": gradeId,
          "currentEnrollement._status": "FAL",
        },
        { enrollment_history: { $size: 0 } },
      ],
    });

    // integrating students and user collecton
    const student = await Promise.all(
      students.map(async (stud) => {
        const user = await User.findById(stud._id.toString());
        return {
          _id: stud._id,
          firstName: user ? user.firstName : null,
          middleName: user ? user.middleName : null,
          lastName: user ? user.lastName : null,
          gender: user ? user.gender : null,
          email: user ? user.email : null,
          role: user ? user.role : null,
          birthDate: stud.birthDate,
        };
      })
    );
    res.status(200).json(student);
  } else {
    const grade = await Grade.find({
      stage: prevGrade[0],
      level: prevGrade[1],
    });

    // students with no enrollment
    const students = await Student.find({
      "currentEnrollement._grade": grade[0]._id,
      "currentEnrollement._status": "PAS",
    }).sort({ createdAt: -1 });

    // integrating students and user collecton
    const student = await Promise.all(
      students.map(async (stud) => {
        const user = await User.findById(stud._id.toString());
        return {
          _id: stud._id,
          firstName: user ? user.firstName : null,
          middleName: user ? user.middleName : null,
          lastName: user ? user.lastName : null,
          gender: user ? user.gender : null,
          email: user ? user.email : null,
          role: user ? user.role : null,
          birthDate: stud.birthDate,
        };
      })
    );
    res.status(200).json(student);
  }
};

const getSpecificStudent = async (req, res) => {
  const { academicYear, academicCurriculum, grade, section } = req.params;

  try {
    // Search criteria
    const searchCriteria = {
      "currentEnrollement._academicCurriculum": academicCurriculum,
      "currentEnrollement._grade": grade,
      "currentEnrollement._section": section,
    };

    // Find students with currentEnrollement matching the criteria
    const students = await Student.find(searchCriteria);

    if (students.length > 0) {
      const results = [];

      for (const student of students) {
        const userData = await User.findById(student._id.toString());

        const result = {
          _id: student._id,
          firstName: userData ? userData.firstName : null,
          middleName: userData ? userData.middleName : null,
          lastName: userData ? userData.lastName : null,
          gender: userData ? userData.gender : null,
          email: userData ? userData.email : null,
          role: userData ? userData.role : null,
          birthDate: student.birthDate,
        };

        results.push(result);
      }
      res.status(200).json(results);
    } else {
      // No match in currentEnrollment, now check enrollment_history
      const studentsInHistory = await Student.find({
        "enrollment_history._academicYear": academicYear,
        "enrollment_history._academicCurriculum": academicCurriculum,
        "enrollment_history._grade": grade,
        "enrollment_history._section": section,
      });

      if (studentsInHistory.length > 0) {
        const results = [];

        for (const student of studentsInHistory) {
          const userData = await User.findById(student._id.toString());

          const result = {
            _id: student._id,
            firstName: userData ? userData.firstName : null,
            middleName: userData ? userData.middleName : null,
            lastName: userData ? userData.lastName : null,
            gender: userData ? userData.gender : null,
            email: userData ? userData.email : null,
            role: userData ? userData.role : null,
            birthDate: student.birthDate,
          };

          results.push(result);
        }

        res.status(200).json(results);
      } else {
        res.status(202).json({ message: "No matching students found" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

// funtion check previos enrollement of student when enrolled
function previousGrade(grade) {
  if (grade.stage === "KG") {
    if (grade.level === 1) {
      return ["null", "null"];
    } else {
      return ["KG", grade.level - 1];
    }
  } else if (grade.stage === "PRM-I" && grade.level === 1) {
    return ["KG", 3];
  } else if (grade.stage === "PRM-II" && grade.level === 5) {
    return ["PRM-I", 4];
  } else if (grade.stage === "SEC" && grade.level === 9) {
    return ["PRM-II", 8];
  } else if (grade.stage === "PREP" && grade.level === 11) {
    return ["SEC", 10];
  } else {
    return [grade.stage, grade.level - 1];
  }
}

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

// function formating date
const dateFormating = (date) => {
  const dates = new Date(date);
  const formattedDate = format(dates, "MMMM d, yyyy");
  return formattedDate;
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  createSeniorStudent,
  deleteStudent,
  updateStudent,
  getElligibleStudent,
  enrollStudents,
  deregisterStudents,
  getSpecificStudent,
  getStudentEnrollment,
  getMarksByStudentId,
};
