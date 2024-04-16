import { Router } from "express";
// import "../constants/users";
import passport from "passport";
import "../strategies/local-stratregy.mjs";
import users from "../constants/users.mjs";

const router = Router();

// router.post("/api/auth", (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(
//     (user) => user.username === username && user.password === password
//   );
//   if (user) {
//     req.session.user = user;
//     res.redirect("/profile");
//   } else {
//     res.redirect("/login");
//   }
// });

router.post(
  "/api/auth/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    // res.json(req.user);
    res.redirect("/");
    // const { username, password } = req.body;
    // const user = users.find(
    //   (user) => user.username === username && user.password === password
    // );
    // if (user) {
    //   req.session.user = user;
    //   res.redirect("/profile");
    // } else {
    //   res.redirect("/login");
    // }
  }
);

router.get("/api/auth/status", (req, res) => {
  req.session.user
    ? res.send(req.session.user)
    : res.json({ status: "unauthorized" });
});

router.get("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.redirect("/");
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  if (!req.user) return res.redirect("login");
  res.render("logout");
});

router.get("/signup", (req, res) => {
  if (req.user) {
    req.flash("error", "Please logout before signing up.");
    return res.redirect("/logout");
  }
  res.render("signup");
});

router.post("/api/auth/signup", (req, res) => {
  // kasus akun sudah ada
  const { username, email, password } = req.body;
  const findUser = users.find((user) => user.username === username);
  console.log("user:", findUser);
  if (findUser) {
    req.flash("error", "username already taken");
    return res.redirect("/signup");
  }
  users.push({ id: ++users.length, username, email, password });

  // if (user) {
  //   req.session.user = user;
  //   res.redirect("/profile");
  // } else {
  //   res.redirect("/login");
  // }
  // console.log(req.body);
  // res.sendStatus(200);
});

export default router;
