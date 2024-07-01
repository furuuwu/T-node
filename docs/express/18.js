// Cookie-based sessions with express-session - common usage

const express = require("express");
const session = require("express-session");
// const bodyParser = require("body-parser"); // this is not needed with express 4.16+

const app = express();

// app.use(bodyParser.json());
// instead of this, use the built-in middlewares
// Use built-in middleware to parse JSON bodies
app.use(express.json());
// Use built-in middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Simulated user database
const users = { ric: "password123" };

// Login route for authentication
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username] === password) {
    // Authentication successful, regenerate session
    req.session.regenerate((err) => {
      if (err) {
        res.status(500).send("Failed to regenerate session.");
      } else {
        // Set the user information in the new session
        req.session.user = { username: username };
        res.send("Login successful and session regenerated.");
      }
    });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Middleware to protect routes
const authenticateSession = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send("Please log in");
  }
};

// Protected route
app.get("/protected", authenticateSession, (req, res) => {
  res.send(`Hello, ${req.session.user.username}`);
});

// Logout route to destroy session
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send("Failed to logout");
    } else {
      res.send("Logout successful");
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
