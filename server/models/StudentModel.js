const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  birth_date: {
    type: Date,
    required: true,
  },
  currentEnrollement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
  },
  previousEnrollement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
  },
  enrollment_history: [
    {
      _year: {
        type: Number,
      },
      _grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade",
      },
      _student_id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      _status: {
        type: String,
        required: true,
        default: "REG",
        enum: ["REG", "ONP", "PAS", "FAL"],
      },
    },
  ],
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
