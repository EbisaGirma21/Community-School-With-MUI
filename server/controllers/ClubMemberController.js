const mongoose = require("mongoose");
const User = require("../models/UserModel");
const Department = require("../models/DepartmentModel");
const Curriculum = require("../models/CurriculumModel");
const ClubMember = require("../models/ClubMemberModel");
const Student = require("../models/StudentModel");
const Grade = require("../models/GradeModel");

// get all ClubMembers
const getClubMembers = async (req, res) => {
  const clubMembers = await ClubMember.find({}).sort({ createdAt: -1 });

  const clubMember = await Promise.all(
    clubMembers.map(async (clubMember) => {
      const user = await User.findById(clubMember.member);
      const student = await Student.findById(clubMember.member);
      const grade = await Grade.findById(student.currentEnrollement._grade);

      return {
        ...clubMember._doc,
        firstName: user ? user.firstName : null,
        middleName: user ? user.middleName : null,
        lastName: user ? user.lastName : null,
        grade: grade
          ? grade.stage === "KG"
            ? `KG - ${grade.level}`
            : `Grade - ${grade.level}`
          : null,
      };
    })
  );

  res.status(200).json(clubMember);
};

// get a single ClubMember
const getClubMember = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such clubMember" });
  }
  const clubMembers = await ClubMember.findById(id);
  const clubMember = await Promise.all(
    clubMembers.map(async (clubMember) => {
      const student = await User.findById(clubMember.member);
      return {
        ...clubMember._doc,
        firstName: student ? student.firstName : null,
        middleName: student ? student.middleName : null,
        lastName: student ? student.lastName : null,
        grade: student ? student.currentEnrollement.grades : null,
      };
    })
  );
  res.status(200).json(clubMember);
};

// create a new ClubMember
const createClubMember = async (req, res) => {
  const { club, member, role } = req.body;
  let emptyFields = [];

  if (!club) {
    emptyFields.push("club");
  }
  if (!member) {
    emptyFields.push("member");
  }
  if (!role) {
    emptyFields.push("role");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all required the fields", emptyFields });
  }

  try {
    const clubMember = await ClubMember.create({
      club,
      member,
      role,
    });
    res.status(200).json(clubMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a ClubMember
const deleteClubMember = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such ClubMember" });
  }

  const exist = await Curriculum.find({
    "grades.subjects.clubMember": id,
  });
  if (exist.length !== 0) {
    return res.status(405).json({
      error: "Deletion is not allowed once  Subject registered on it!",
    });
  }

  const clubMember = await ClubMember.findOneAndDelete({ _id: id });

  if (!clubMember) {
    return res.status(400).json({ error: "No such ClubMember" });
  }

  res.status(200).json(clubMember);
};

// update a ClubMember
const updateClubMember = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such ClubMember" });
  }

  const clubMember = await ClubMember.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!clubMember) {
    return res.status(400).json({ error: "No such ClubMember" });
  }

  res.status(200).json(clubMember);
};

module.exports = {
  getClubMembers,
  getClubMember,
  createClubMember,
  deleteClubMember,
  updateClubMember,
};
