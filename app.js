const express = require("express");
const cors = require("cors");
const app = express();

// Use CORS middleware
app.use(cors());
app.use(express.json());

// In-memory "database"
let users = [];

// CREATE: Add a new user
app.post("/api/users", (req, res) => {
  const user = req.body;
  user.id = users.length + 1; // Simple ID assignment
  users.push(user);
  res.status(201).json(user);
});

// READ: Get all users
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// READ: Get a user by ID
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// UPDATE: Update user details
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === userId);

  if (index !== -1) {
    const updatedUser = { ...users[index], ...req.body };
    users[index] = updatedUser;
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE: Remove a user
app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === userId);

  if (index !== -1) {
    users.splice(index, 1);
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const fs = require("fs");
fs.writeFileSync("learn.text", "learning node.js");
