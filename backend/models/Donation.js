const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    location: String,
    quantity: Number,
    status: { type: String, default: "Pending" },
    imageUrl: String,
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Donation", donationSchema);
