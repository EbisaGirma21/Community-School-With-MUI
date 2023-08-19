const Teacher = require("../models/TeacherModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");
const { createUser, deleteUserById, updateUser } = require("./UserController");

// get all Teachers
const getTeachers = async (req, res) => {
  const teachers = await Teacher.find({});
  const teacher = await Promise.all(
    teachers.map(async (teach) => {
      const user = await User.findById(teach._id.toString());
      return {
        _id: teach._id,
        firstName: user ? user.firstName : null,
        middleName: user ? user.middleName : null,
        lastName: user ? user.lastName : null,
        gender: user ? user.gender : null,
        email: user ? user.email : null,
        role: user ? user.role : null,
        phoneNumber: user ? user.phoneNumber : null,
        address: user ? user.address : null,
      };
    })
  );
  res.status(200).json(teacher);
};

// get a single Teacher
const getTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such teacher" });
  }
  const teachers = await Teacher.findById(id);
  const teacher = await Promise.all(
    teachers.map(async (teach) => {
      const user = await User.findById(teach._id.toString());
      return {
        _id: teach._id,
        firstName: user ? user.firstName : null,
        middleName: user ? user.middleName : null,
        lastName: user ? user.lastName : null,
        gender: user ? user.gender : null,
        email: user ? user.email : null,
        role: user ? user.role : null,
        phoneNumber: user ? user.phoneNumber : null,
        address: user ? user.address : null,
      };
    })
  );
  if (!teacher) {
    return res.status(404).json({ error: "No such teacher" });
  }

  res.status(200).json(teacher);
};

// create a new Teacher
const createTeacher = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    gender,
    email,
    role,
    phoneNumber,
    address,
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
  if (!phoneNumber) {
    emptyFields.push("phoneNumber");
  }
  if (!address) {
    emptyFields.push("address");
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
      role,
      phoneNumber,
      address
    );
    const teacher = new Teacher({
      _id: user.user._id,
    });
    await teacher.save();
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Teacher
const deleteTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Teacher" });
  }

  const user = await deleteUserById(id);
  if (!user) {
    return res.status(400).json({ error: "No such Teacher" });
  }
  const teacher = await Teacher.findOneAndDelete({ _id: id });

  if (!teacher) {
    return res.status(400).json({ error: "No such Teacher" });
  }

  res.status(200).json(teacher);
};

// update a Teacher
const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    middleName,
    lastName,
    gender,
    email,
    phoneNumber,
    address,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Teacher" });
  }
  const user = await updateUser(
    id,
    firstName,
    middleName,
    lastName,
    gender,
    email,
    phoneNumber,
    address
  );
  if (!user) {
    return res.status(400).json({ error: "No such Teacher" });
  }
  const teacher = await Teacher.findById({ _id: id });

  res.status(200).json(teacher);
};

module.exports = {
  getTeachers,
  getTeacher,
  createTeacher,
  deleteTeacher,
  updateTeacher,
};
