const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // Allows your frontend to communicate with this backend
app.use(express.json()); // Allows the server to process JSON data

// --- MONGODB CONNECTION ---
// Make sure MONGODB_URI is set in Render's Environment Variables
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Successfully connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- ROUTES ---

// 1. Home Route (This fixes the "Cannot GET /" error)
app.get('/', (req, res) => {
    res.send('✅ Portfolio Backend is live and running!');
});

// 2. Health Check Route
app.get('/api/status', (req, res) => {
    res.json({ 
        status: "Online", 
        database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected" 
    });
});

// --- START SERVER ---
// Render dynamically assigns a PORT, so process.env.PORT is required
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
});
