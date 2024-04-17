// const { Router } = require("express");
import { Router } from "express";
// const auth = require("./auth.mjs");
import auth from "./auth.mjs";

// import content from "./hakim/content.mjs";
import blog from "./blog.mjs";
import home from "./hakim/home.mjs";
import profile from "./profile.mjs";
import explore from "./hakim/explore.mjs";
import myblogs from "./myblogs.mjs";
// const users = require("./users.mjs");

// const login = require("./login.mjs");
// const root = require("./root.mjs");

import users from "./users.mjs";
import root from "./root.mjs";
const router = Router();

router.use(auth);
router.use(users);
// router.use(root);
router.use(home);
// router.use(content);
router.use(blog);
router.use(profile);
router.use(explore);
router.use(myblogs);

export default router;
