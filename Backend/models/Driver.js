// models/Driver.js
const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: String,
  phone: String,
  vehicleModel: String,
  rating: Number,
  status: { type: String, default: "Active" },
}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);
