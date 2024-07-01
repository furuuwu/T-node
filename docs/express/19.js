// Token-based sessions - JWT

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SECRET_KEY = "your-secret-key";

// Simulated user database
const users = { ric: "password123" };

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

// Route to login and get a token
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username] === password) {
    const user = { name: username };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Protected route
app.get("/protected", authenticateToken, (req, res) => {
  res.send(`Hello, ${req.user.name}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
