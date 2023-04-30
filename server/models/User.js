import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    middleName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      default: "",
    },
    phone: String,
    gender: { type: String, enum: ["male", "female", "other"] },
    role: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
