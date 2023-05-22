import mongoose from "mongoose";

const TeacherSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);
export default Teacher;
