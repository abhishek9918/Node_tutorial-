const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Content = require("./content"); // Import the schema

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// API Routes

// Fetch all content
app.get("/api/content", async (req, res) => {
  try {
    const content = await Content.find();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Fetch content by ID
app.get("/api/content/:id", async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (content) {
      res.status(200).json(content);
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add new content
app.post("/api/content", async (req, res) => {
  try {
    const newContent = new Content(req.body);
    const savedContent = await newContent.save();
    res.status(201).json(savedContent);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete content
app.delete("/api/content/:id", async (req, res) => {
  try {
    const deletedContent = await Content.findByIdAndDelete(req.params.id);
    if (deletedContent) {
      res.status(200).json({ message: "Content deleted" });
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
