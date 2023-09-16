const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/UserModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // create token
    const token = createToken(user._id);
    const role = user.role;
    const _id = user._id;

    res.status(200).json({ email, role, _id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  create user
const createUser = async (
  firstName,
  middleName,
  lastName,
  gender,
  email,
  role,
  phoneNumber,
  address
) => {
  const password = "ABCabc123@#";

  try {
    // Create the user
    const user = await User.createUser(
      firstName,
      middleName,
      lastName,
      gender,
      email,
      role,
      phoneNumber,
      address,
      password
    );

    // Create token
    const token = createToken(user._id);

    return { user, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

// get a single user
const getUser = async (req, res) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// get  users
const getUsers = async (req, res) => {
  const users = await User.find({});
  if (!users) {
    return res.status(404).json({ error: "No such user" });
  }
  res.status(200).json(users);
};

// update user
const updateUser = async (
  id,
  firstName,
  middleName,
  lastName,
  gender,
  email
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      firstName,
      middleName,
      lastName,
      gender,
      email,
    }
  );
  if (!user) {
    return null;
  }
  return user;
};

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }
  const user = await User.findOneAndDelete({
    _id: id,
  });
  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

// to delete from student
const deleteUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const user = await User.findOneAndDelete({
    _id: id,
  });
  if (!user) {
    return null;
  }
  return user;
};

const createOtherUser = async (req, res) => {
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
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
  createOtherUser,
  deleteUserById,
};
