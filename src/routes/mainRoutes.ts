import { Router, Request, Response } from "express";
import path from "path";

const router = Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "html", "index.html")
  );
});

router.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    const authenticatedUser = req.user;
    if (authenticatedUser) {
      const adminUserIds = process.env.ADMIN_USERS?.split(",") || [];
      const isAdmin = adminUserIds.includes(authenticatedUser.userId);

      if (isAdmin) {
        authenticatedUser.is_admin = isAdmin;
        console.log(authenticatedUser.userId);
      }
    }
    res.sendFile(
      path.join(__dirname, "..", "..", "public", "html", "dashboard.html")
    );
  } else {
    res.redirect("/");
  }
});

export default router;
