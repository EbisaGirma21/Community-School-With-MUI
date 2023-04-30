import mongoose from "mongoose";

const StudentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    kebele: {
      type: String,
      required: true,
    },
    grade: {},
    studentStatus: {},
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;
