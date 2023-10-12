const Student = require("../models/StudentModel");
const Grade = require("../models/GradeModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");
const { createUser, deleteUserById, updateUser } = require("./UserController");
const Mark = require("../models/MarkModel");
const AcademicCurriculum = require("../models/AcademicCurriculumModel");
const Curriculum = require("../models/CurriculumModel");
const { format } = require("date-fns");

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
  const students = await Student.findById(id);

  const student = await Promise.all(
    students.map(async (stud) => {
      const user = await User.findById(stud._id.toString());
      return {
        ...stud._doc,
        firstName: user ? user.firstName : null,
        middleName: user ? user.middleName : null,
        lastName: user ? user.lastName : null,
        gender: user ? user.gender : null,
        email: user ? user.email : null,
        role: user ? user.role : null,
      };
    })
  );

  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }

  res.status(200).json(student);
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
  if (!email) {
    emptyFields.push("email");
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

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
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
    const student = new Student({
      _id: user.user._id,
      birthDate,
      registrationType,
    });
    await student.save();
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
  } = req.body;
  console.log(familyAddress);

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
  if (!email) {
    emptyFields.push("email");
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
    !previousAcademicStatus
  ) {
    emptyFields.push("familyInfo");
  }
  if (emptyFields.length > 0) {
    console.log(
      familyFirstName,
      familyMiddleName,
      familyLastName,
      familyGender,
      familyEmail,
      familyPhoneNumber,
      familyAddress
    );
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const seniorEnrollment = {
      _academicYear: previousYear,
      _grade: previousGrade,
      _stage: previousStage,
      _classification: previousClassification,
      _totalMark: previousTotalMark,
      _average: previousAverage,
      _grade: previousGrade,
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
    const student = new Student({
      _id: user.user._id,
      birthDate,
      registrationType,
      currentEnrollement: seniorEnrollment,
      enrollment_history: [seniorEnrollment],
    });
    await student.save();

    // add senior information

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
                value: 0,
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

    console.log(gradeId);

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
};
