const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // This is the key
require('dotenv').config();

const app = express();

// --- UPDATED CORS SETTINGS ---
// This tells the backend to trust requests from your GitHub portfolio
app.use(cors({
    origin: 'https://abhinand9364.github.io', 
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ Connection Error:", err));

// Inquiry Schema & Model
const Inquiry = mongoose.model('Inquiry', new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
}));

// Home Route
app.get('/', (req, res) => res.send('✅ Backend is Live!'));

// POST Route for the form
app.post('/api/contact', async (req, res) => {
    try {
        const newInquiry = new Inquiry(req.body);
        await newInquiry.save();
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server on ${PORT}`));
