import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import session from "express-session";
import path from "path";
import passport from "passport";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { UserStorage } from "./models/userStorage.js";
import { setupDatabase } from "./database.js";

dotenv.config();
setupDatabase();

// Routes
import mainRoutes from "./routes/mainRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import logoutRoute from "./routes/logoutRoute.js";

// Serialization
passport.serializeUser((user, done) => {
  done(null, user.userId);
});
passport.deserializeUser((userId: string, done) => {
  const user = UserStorage.users.find((u) => u.userId === userId);
  done(null, user);
});

// Passport configuration
passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: process.env.CALLBACK_URL!,
      scope: ["user.read"],
    },
    UserStorage.findOrCreate
  )
);

// Express app setup
const app = express();
const port = 9000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const expressSession = session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
});

app.use(expressSession);

// Authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.use("/auth", authRoutes);

// Main routes
app.use(mainRoutes);

// Logout route
app.use(logoutRoute);

// Serve static files
app.use(express.static(path.join(__dirname, "..", "public")));

// Start the server
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
