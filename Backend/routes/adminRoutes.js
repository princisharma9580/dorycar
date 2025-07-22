const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
  getRides,
  getDrivers,
  getUsers,
  getRideStats,
  getUserStats,
  getTickets,
  updateTicketStatus,
  getTicketById,
} = require("../controller/adminController");

router.get("/ride-stats", adminAuth, getRideStats);
router.get("/user-stats", adminAuth, getUserStats);
router.get("/rides", adminAuth, getRides);
router.get("/drivers", adminAuth, getDrivers);
router.get("/users", adminAuth, getUsers);
router.get("/ticket", adminAuth, getTickets);
router.put("/ticket/:ticketId/status", adminAuth, updateTicketStatus);
router.get("/ticket/:ticketId/details", adminAuth, getTicketById);
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = require("jsonwebtoken").sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
