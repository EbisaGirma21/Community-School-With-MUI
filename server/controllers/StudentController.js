const StudentModel = require("../models/StudentModel");
const mongoose = require("mongoose");

// get all Students
const getStudents = async (req, res) => {
  try {
    await init();
    const Student = await StudentModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      status: "Success",
      data: {
        Student,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed to retrieve students",
      message: err,
    });
  }
};