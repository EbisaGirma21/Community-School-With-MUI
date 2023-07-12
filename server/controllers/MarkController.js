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

      return {
        ...mark._doc,
        firstName: user ? user.firstName : null,
        middleName: user ? user.middleName : null,
        lastName: user ? user.lastName : null,
        gender: user ? user.gender : null,
      };
    })
  );

  res.status(200).json(marksData);
};

module.exports = {
  getMarks,
};
