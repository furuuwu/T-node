// Cookie-based sessions with express-session
/*
/set-session: set a session variable username to furuuwu using sess.username.
/get-session: check if the session variable username exists and return it using sess.username.
/regenerate-session: regenerate the session and optionally set the session variable again if needed.
/destroy-session: destroy the session and return a response.
*/

const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.json());

app.set("trust proxy", 1); // trust first proxy
const sessionOptions = {
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
};
app.use(session(sessionOptions));

// Route to create a session and set a session variable
app.get("/set-session", (req, res) => {
  // create a session `sess`
  const sess = req.session;

  // create a session variable variable `username` and give it avalue
  sess.username = "furuuwu";
  res.send("Session variable is set.");
});

// Route to read the session variable
app.get("/get-session", (req, res) => {
  const sess = req.session;
  if (sess.username) {
    res.send(`Session variable: ${sess.username}`);
  } else {
    res.send("No session variable set.");
  }
});

// Route to regenerate session
app.get("/regenerate-session", (req, res) => {
  req.session.regenerate((err) => {
    if (err) {
      res.status(500).send("Failed to regenerate session.");
    } else {
      const sess = req.session;
      sess.username = "furuuwu"; // Optional: Set session variable again if needed
      res.send("Session regenerated.");
    }
  });
});

// Route to destroy session
app.get("/destroy-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send("Failed to destroy session.");
    } else {
      res.send("Session destroyed.");
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
