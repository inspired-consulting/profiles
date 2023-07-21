import { Router, Request, Response } from "express";
import path from "path";
import { insertOrUpdateUser } from "../insertOrUpdateUser.js";
import { getProfilePicture } from "../models/userStorage.js";

const router = Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/dashboard", async (req, res) => {
  if (req.isAuthenticated()) {
    const authenticatedUser = req.user;
    if (authenticatedUser) {
      res.render("dashboard");
      await insertOrUpdateUser(req.user);
      await getProfilePicture(
        authenticatedUser.userId,
        authenticatedUser.accessToken
      );
    }
  } else {
    res.redirect("/");
  }
});

router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  } else {
    const authenticatedUser = req.user;
    res.render("profile", { authenticatedUser });
  }
});

export default router;
