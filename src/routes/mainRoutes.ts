import { Router, Request, Response } from "express";
import path from "path";
import { insertOrUpdateUser } from "../insertOrUpdateUser.js";

const router = Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "html", "index.html")
  );
});

router.get("/dashboard", async (req, res) => {
  if (req.isAuthenticated()) {
    const authenticatedUser = req.user;
    if (authenticatedUser) {
      res.sendFile(
        path.join(__dirname, "..", "..", "public", "html", "dashboard.html")
      );
      await insertOrUpdateUser(req.user);
    }
  } else {
    res.redirect("/");
  }
});

export default router;
