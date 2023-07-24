import { Router, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { insertOrUpdateUser } from "../insertOrUpdateUser.js";
import { getProfilePicture } from "../models/userStorage.js";
import { serveCachedImage } from "../utils.js";
const router = Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const isDevelopment = process.env.NODE_ENV === "development";

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/dashboard", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }

  const authenticatedUser = req.user;
  if (!authenticatedUser) {
    return res.redirect("/");
  }

  res.render("dashboard");
  await insertOrUpdateUser(authenticatedUser);
  await getProfilePicture(
    authenticatedUser.userId,
    authenticatedUser.accessToken
  );
});

router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  } else {
    const authenticatedUser = req.user;
    const cacheBuster = isDevelopment ? Date.now() : "";
    res.render("profile", { authenticatedUser, cacheBuster });
  }
});

router.get("/cache/images/:userId.jpeg", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  } else {
    const userId = req.params.userId;
    serveCachedImage("images", userId, res);
  }
});

router.get("/cache/thumbnails/:userId_thumbnail.jpeg", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  } else {
    const userId = req.params.userId_thumbnail;
    serveCachedImage("thumbnails", userId, res);
  }
});

export default router;
