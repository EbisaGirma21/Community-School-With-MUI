const Student = require("../models/StudentModel");
const Grade = require("../models/GradeModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");
const { createUser, deleteUserById, updateUser } = require("./UserController");

// get all Students
const getStudents = async (req, res) => {
  const students = await Student.find({});
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

  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }

  res.status(200).json(student);
};

// create a new Student
const createStudent = async (req, res) => {
  const { firstName, middleName, lastName, gender, email, role, birthDate } =
    req.body;

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

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const user = await createUser(
      firstName,
      middleName,
      lastName,
      gender,
      email,
      role
    );
    const student = new Student({
      _id: user.user._id,
      birthDate,
    });
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Student
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  console.log(id);
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

const getElligibleStudent = async (req, res) => {
  const { gradeId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(gradeId)) {
    return res.status(400).json({ error: "No such grade" });
  }
  const grade = await Grade.findById({ _id: gradeId });
  const prevGrade = previousGrade(grade);
  if ((prevGrade[0] = "null")) {
    const students = await Student.find({}).sort({ createdAt: -1 });
    res.status(200).json(students);
  }
};

function previousGrade(grade) {
  if (grade.stage === "KG") {
    if (grade.level === 1) {
      return ["null", "null"];
    } else {
      return ["KG", grade.level];
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
    return [grade.stage, grade.label - 1];
  }
}

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  getElligibleStudent,
};
