import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";
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
router.get("/images/:userId", (req, res) => {
  const userId = req.params.userId;
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "cache",
    "images",
    `${userId}.jpeg`
  );

  if (fs.existsSync(filePath)) {
    const maxAgeInSeconds = 1800;
    res.setHeader("Cache-Control", `public, max-age=${maxAgeInSeconds}`);

    res.sendFile(filePath);
  } else {
    res.sendStatus(404);
  }
});

export default router;
