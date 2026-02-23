const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Prevents "CORS Policy" errors in the browser
app.use(express.json()); // Parses incoming JSON data

// MongoDB Connection 
// Replace the URI in your Render Environment Variables, not here!
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Successfully connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test Route
app.get('/api/status', (req, res) => {
    res.json({ message: "Backend is running!", status: "Connected" });
});

// Start Server
// Render provides the PORT dynamically, so process.env.PORT is mandatory
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
