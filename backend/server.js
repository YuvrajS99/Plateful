const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');         // ✅ Auth routes
const donationRoutes = require('./routes/donation'); // ✅ Donation routes

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes); // ✅ Donation route added

// Test route
app.get("/", (req, res) => {
    res.send("Welcome to Plateful backend!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
