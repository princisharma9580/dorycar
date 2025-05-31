// routes/admin.js
const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
  getRides,
  getDrivers,
  getUsers,
  getPayouts,
} = require("../controller/adminController");

router.get("/rides", adminAuth, getRides);
router.get("/drivers", adminAuth, getDrivers);
router.get("/users", adminAuth, getUsers);
router.get("/payouts", adminAuth, getPayouts);

module.exports = router;
