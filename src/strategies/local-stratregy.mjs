import passport from "passport";
import { Strategy } from "passport-local";
import users from "../constants/users.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const findUserById = users.find((user) => user.id === id);
    if (!findUserById) {
      throw new Error("user not found");
    }
    done(null, findUserById);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    try {
      const findUser = users.find((user) => user.username === username);
      if (!findUser) {
        throw new Error("user not found");
      }
      if (findUser.password !== password) {
        throw new Error("password not match");
      }
      done(null, findUser);
    } catch (err) {
      console.log("erorr");
      done(err, null, { message: err.message });
    }
  })
);
