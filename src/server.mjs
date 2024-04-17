import dotenv from "dotenv";
dotenv.config();
import express from "express";
import routes from "./routes/index.mjs";
import User from "./models/user.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./models/db.mjs";
import "./strategies/local-stratregy.mjs";
import flash from "express-flash";
const PORT = process.env.PORT || 3000;
const app = express();
connectDB();

// register ejs as view engine
app.set("view engine", "ejs");
app.set("views", path.dirname(fileURLToPath(import.meta.url)) + "/views");
//--

// registering middleware
// app.use(
//   express.static(
//     path.join(path.dirname(fileURLToPath(import.meta.url)), "public")
//   )
// ); // use static files
app.use(express.static("public")); // use static files
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/* 
  gist: supaya bisa baca hasil dari html form
  penjelasan: application/x-www-form-urlencoded merupakan default value dari atribut enctype pada tag <form> yang digunakan untuk mengirimkan data form ke server.
*/
app.use(cookieParser("cookie-secret")); // use cookie parser
app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
); // use session

app.use(flash()); // use flash
app.use(passport.initialize()); // use passport initialize
app.use(passport.session()); // use passport session

app.use(routes); // use the all the routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// app.get("/", (req, res) => {
//   // req.sessionStore.get(req.sessionID, (err, sessionData) => {
//   //   console.log(sessionData);
//   // });
//   console.log(req.user);
// });

app.get("/profile", (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  res.render("profile", { user: req.user.username });
});

// app.get("/debug", (req, res) => {
//   // req.session.debugSession = { username: "David" };
//   const a = new User({
//     username: "a",
//     email: "a@lodianto.com",
//     password: "a",
//     bio: "i l",
//     pfp: "(path to img)",
//   });
//   a.save();
//   res.json("its nice");
// });
