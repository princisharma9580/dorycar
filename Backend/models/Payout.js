// models/Payout.js
const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  driverName: String,
  amount: Number,
  status: String, // Pending, Completed, etc.
  date: Date,
}, { timestamps: true });

module.exports = mongoose.model("Payout", payoutSchema);
