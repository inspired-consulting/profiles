import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import path from 'path';
import passport from 'passport';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import dotenv from 'dotenv';
dotenv.config();

//For in-memory storage:
let users: User[] = [];

class User {
  userId: string;
  displayName: string;
  mail: string;
  userPrincipalName: string;

  constructor(userId: string, displayName: string, mail: string, userPrincipalName: string) {
    this.userId = userId;
    this.displayName = displayName;
    this.mail = mail;
    this.userPrincipalName = userPrincipalName;
  }

  static findOrCreate(profile: any, done: any) {
    let user = users.find(u => u.userId === profile.id);
    if (user) {
      done(null, user);
    } else {
      user = new User(profile.id, profile.displayName, profile.mail, profile.userPrincipalName);
      users.push(user);
      done(null, user);
    }
  }
}

passport.serializeUser((user: User, done) => {
  done(null, user.userId);
});
passport.deserializeUser((userId: string, done) => {
  const user = users.find((u) => u.userId === userId);
  done(null, user);
});

// Passport configuration
passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:9000/auth/microsoft/callback',
      scope: ['user.read'],
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate(profile, done);
    }
  )
);

// Express app setup
const app = express();
const port = 9000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const expressSession = session({
  secret: 'very-secret-key',
  resave: false,
  saveUninitialized: false,
});

app.use(expressSession)

// Authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// Authentication routes
app.get('/auth/microsoft', 
  passport.authenticate('microsoft', { 
      scope: ['user.read'], 
      prompt: 'select_account',
      successReturnToOrRedirect: '/',
      failureRedirect: '/login',
      failureMessage: true,
      keepSessionInfo: true 
  }
));

app.get('/auth/microsoft/callback', 
  passport.authenticate('microsoft', { failureRedirect: '/login' }), (req, res) => {
  // Route user to the dashboard after login:
  res.redirect('/dashboard.html');
});

// Main route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'));
});
app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'dashboard.html'));
});

// Logout route
app.post('/logout', (req: Request, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Start the server
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
