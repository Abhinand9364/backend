const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); 
app.use(express.json()); 

// --- MONGODB CONNECTION ---
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Successfully connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- DATA MODEL (The Schema) ---
const InquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
const Inquiry = mongoose.model('Inquiry', InquirySchema);

// --- ROUTES ---

// Home Route
app.get('/', (req, res) => {
    res.send('✅ Portfolio Backend is live and running!');
});

// Inquiry Submission Route
app.post('/api/contact', async (req, res) => {
    try {
        const newInquiry = new Inquiry({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        await newInquiry.save();
        res.status(201).json({ success: true, message: "Inquiry saved successfully!" });
    } catch (err) {
        console.error("Save error:", err);
        res.status(500).json({ success: false, error: "Failed to save inquiry." });
    }
});

// --- START SERVER ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
