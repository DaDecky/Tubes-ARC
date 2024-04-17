import passport from "passport";
import { Strategy } from "passport-local";
import users from "../constants/users.mjs";
import User from "../models/user.mjs";
import mongoose from "mongoose";

passport.serializeUser((user, done) => {
  // console.log("ser", user._id);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  // console.log("des", id);
  try {
    const findUserById = await User.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    // console.log(findUserById);
    // const findUserById = users.find((user) => user.id === id);
    if (!findUserById) {
      throw new Error("user not found");
    }
    done(null, findUserById);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      // const findUser = users.find((user) => user.username === username);
      const findUser = await User.findOne({ username: username });
      if (!findUser) {
        return done(null, false, { message: "User not found" });
        // throw new Error("user not found");
      }
      if (findUser.password !== password) {
        return done(null, false, { message: "Password not match" });
        // throw new Error("password not match");
      }
      done(null, findUser);
    } catch (err) {
      // console.log("erorr");
      // done(err, null, { message: err.message });
      done(err);
    }
  })
);
