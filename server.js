const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- CORS TWEAK ---
// Allows your GitHub Pages site to securely send data
app.use(cors({
    origin: 'https://abhinand9364.github.io', 
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Atlas Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Schema
const Inquiry = mongoose.model('Inquiry', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
}));

// Routes
app.get('/', (req, res) => res.send('✅ Portfolio Backend is live!'));

app.post('/api/contact', async (req, res) => {
    try {
        const newInquiry = new Inquiry(req.body);
        await newInquiry.save();
        res.status(201).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
