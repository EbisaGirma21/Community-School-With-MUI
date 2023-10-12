const mongoose = require("mongoose");

const ClubMemberSchema = new mongoose.Schema({
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  role: {
    type: String,
    required: true,
    default: "MEM",
    enum: ["Member", "Leader", "Secrttary", "Vice Leader"],
  },
});

const ClubMember = mongoose.model("ClubMember", ClubMemberSchema);

module.exports = ClubMember;
