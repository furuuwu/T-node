// Authentication with passport, cookie-based sessions with express-session
/*
/login: Authenticates the user using Passport's local strategy.
/protected: A protected route that only authenticated users can access.
/logout: Logs the user out by destroying the session.

authenticateSession: Middleware to protect routes by checking if the user is authenticated.
*/

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your-secret-key", // This can be any string
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Simulated user database with hashed passwords
const users = {
  ric: {
    username: "ric",
    passwordHash: bcrypt.hashSync("password123", 10),
  },
};

// Passport configuration - Local Strategy: authenticates users using a username and password stored in the users object.
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users[username];
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    bcrypt.compare(password, user.passwordHash, (err, result) => {
      if (err) {
        return done(err);
      }
      if (!result) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  const user = users[username];
  if (user) {
    done(null, user);
  } else {
    done(new Error("User not found"));
  }
});

app.use(passport.initialize());
app.use(passport.session());

// Login route
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/protected",
    failureRedirect: "/login",
    failureFlash: false,
  })
);

// Middleware to protect routes
const authenticateSession = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Please log in");
};

// Protected route
app.get("/protected", authenticateSession, (req, res) => {
  res.send(`Hello, ${req.user.username}`);
});

// Logout route to destroy session
app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Failed to logout");
    }
    res.send("Logout successful");
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
