import { Router, Request, Response } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/microsoft',
  passport.authenticate('microsoft', {
    scope: ['user.read'],
    prompt: 'select_account',
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
    keepSessionInfo: true,
  })
);

router.get('/microsoft/callback', passport.authenticate('microsoft', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard.html');
});

export default router;