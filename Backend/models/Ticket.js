// models/Ticket.js
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ride: { type: mongoose.Schema.Types.ObjectId, ref: "Ride", required: true },
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  againstUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  issue: { type: String, required: true },
  status: { type: String, default: "open", enum: ["open", "in-progress", "resolved", "closed"] },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date },
  image: {
  type: String,
  default: null,
}
 
});

module.exports = mongoose.model("Ticket", ticketSchema);
