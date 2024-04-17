import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
    default: "hehe",
  },
  pfp: {
    type: String,
    default: "hehe",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
