import dotenv from 'dotenv';
dotenv.config();
import { Router, Request, Response } from 'express';

const router = Router();

// Logout route
router.post('/logout', (req: Request, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect(`https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/logout`);
  });
});

export default router;