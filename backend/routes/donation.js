const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// 📌 1. CREATE a new donation
router.post("/", async (req, res) => {
    try {
        const newDonation = new Donation(req.body);
        await newDonation.save();
        res.status(201).json({ message: "Donation submitted!", donation: newDonation });
    } catch (err) {
        console.error("Donation Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// 📌 2. GET all donations
router.get("/", async (req, res) => {
    try {
        const donations = await Donation.find().sort({ createdAt: -1 });
        res.status(200).json(donations);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch donations" });
    }
});

// 📌 3. GET donations by donor ID
router.get("/donor/:donorId", async (req, res) => {
    try {
        const donations = await Donation.find({ donorId: req.params.donorId });
        res.status(200).json(donations);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch donations by user" });
    }
});

// 📌 4. UPDATE donation status (like Pending → Picked)
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await Donation.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to update status" });
    }
});

// 📌 5. DELETE donation
router.delete("/:id", async (req, res) => {
    try {
        await Donation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Donation deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete donation" });
    }
});

module.exports = router;
