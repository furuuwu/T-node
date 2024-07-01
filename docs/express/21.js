// Authentication with passport, JWT sessions

const express = require("express");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const saltRounds = 10;
const plainTextPassword = "password123";
// Simulated user database with hashed passwords
const users = {
  ric: {
    id: 1,
    username: "ric",
    passwordHash: bcrypt.hashSync(plainTextPassword, saltRounds),
  },
};

// JWT secret key
const jwtSecretKey = "your-jwt-secret";

// JWT options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
};

// Passport configuration for JWT strategy
passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    const user = users[jwtPayload.username];
    if (!user) {
      return done(null, false, { message: "User not found" });
    }
    return done(null, user);
  })
);

// Login route with JWT token generation
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user) {
    return res.status(401).send("Incorrect username.");
  }
  bcrypt.compare(password, user.passwordHash, (err, result) => {
    if (err || !result) {
      return res.status(401).send("Incorrect password.");
    }
    const token = jwt.sign({ username: user.username }, jwtSecretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  });
});

// Protected route using JWT authentication
app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(`Hello, ${req.user.username}`);
  }
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
