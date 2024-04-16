import { Router } from "express";
import users from "../constants/users.mjs";

const router = Router();

router.get("/api/users", (req, res) => {
  res.json(users);
});

router.get("/api/users/:id", (req, res) => {
  res.json(users.find((user) => user.id == req.params.id));
});

export default router;
