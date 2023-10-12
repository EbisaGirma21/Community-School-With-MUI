const Club = require("../models/ClubModel");
const mongoose = require("mongoose");
const User = require("../models/UserModel");
const Department = require("../models/DepartmentModel");
const Curriculum = require("../models/CurriculumModel");

// get all Clubs
const getClubs = async (req, res) => {
  const clubs = await Club.find({}).sort({ createdAt: -1 });

  const club = await Promise.all(
    clubs.map(async (club) => {
      const student = await User.findById(club.leader);
      const teacher = await User.findById(club.coordinator);
      return {
        ...club._doc,
        leaderStudent: student ? `${student.firstName}` : "TBA",
        coordinatorTeacher: teacher
          ? teacher.gender === "Male"
            ? `Mr. ${teacher.firstName}`
            : `Mrs. ${teacher.firstName}`
          : "TBA",
      };
    })
  );

  res.status(200).json(club);
};

// get a single Club
const getClub = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such club" });
  }
  const clubs = await Club.findById(id);
  const club = await Promise.all(
    clubs.map(async (club) => {
      const student = await User.findById(club.leader);
      const teacher = await User.findById(club.coordinator);
      return {
        ...club._doc,
        leaderStudent: student ? `${student.firstName}` : "TBA",
        coordinatorTeacher: teacher
          ? teacher.gender === "Male"
            ? `Mr. ${teacher.firstName}`
            : `Mrs. ${teacher.firstName}`
          : "TBA",
      };
    })
  );

  res.status(200).json(club);
};

// create a new Club
const createClub = async (req, res) => {
  const { clubName, leader, coordinator } = req.body;
  let emptyFields = [];

  if (!clubName) {
    emptyFields.push("clubName");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all required the fields", emptyFields });
  }

  try {
    console.log();
    const club =
      !leader && !coordinator
        ? await Club.create({
            clubName,
          })
        : !leader
        ? await Club.create({
            clubName,
            coordinator,
          })
        : !coordinator
        ? await Club.create({
            clubName,
            leader,
          })
        : await Club.create({
            clubName,
            leader,
            coordinator,
          });
    res.status(200).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Club
const deleteClub = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Club" });
  }

  const exist = await Curriculum.find({
    "grades.subjects.club": id,
  });
  if (exist.length !== 0) {
    return res.status(405).json({
      error: "Deletion is not allowed once  Subject registered on it!",
    });
  }

  const club = await Club.findOneAndDelete({ _id: id });

  if (!club) {
    return res.status(400).json({ error: "No such Club" });
  }

  res.status(200).json(club);
};

// update a Club
const updateClub = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Club" });
  }

  const club = await Club.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!club) {
    return res.status(400).json({ error: "No such Club" });
  }

  res.status(200).json(club);
};

module.exports = {
  getClubs,
  getClub,
  createClub,
  deleteClub,
  updateClub,
};
