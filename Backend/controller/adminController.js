// controllers/adminController.js
const Ride = require("../models/Ride");
const User = require("../models/User");
const Driver = require("../models/Driver");
const Payout = require("../models/Payout");

exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find()
      .populate("driver", "name")
      .populate("passenger", "name")
      .sort({ createdAt: -1 });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch rides" });
  }
};

exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ createdAt: -1 });
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch drivers" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

exports.getPayouts = async (req, res) => {
  try {
    const payouts = await Payout.find().sort({ createdAt: -1 });
    res.json(payouts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payouts" });
  }
};
