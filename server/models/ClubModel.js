const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  coordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

const Club = mongoose.model("Club", ClubSchema);

module.exports = Club;
