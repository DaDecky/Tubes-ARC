// const { Router } = require("express");
import { Router } from "express";
// const auth = require("./auth.mjs");
import auth from "./auth.mjs";
// const users = require("./users.mjs");

// const login = require("./login.mjs");
// const root = require("./root.mjs");

import users from "./users.mjs";
import root from "./root.mjs";
const router = Router();

router.use(auth);
router.use(users);
router.use(root);

export default router;
