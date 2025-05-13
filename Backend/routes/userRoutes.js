const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate("ratings.by", "name");

    console.log("User in /me:", user.averageRating);
    console.log("User fetched:", user.ratings);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: err.message });
  }
});

// PATCH /api/users/profile
router.patch("/profile", auth, async (req, res) => {
  try {
    const userId = req.userId;

    const updates = req.body;

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    res.json({ message: "Profile updated", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
});

// Update user profile
router.put("/:userId", auth, async (req, res) => {
  try {
    const {
      name,
      email,
      gender,
      phone,
      dob,
      profileImage,
      emergencyContact,
      address,
      preferredCommunication,
      ridePreference,
      vehicle,
      vehicleImage,
      rcDocument,
      idProof,
      license,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        name,
        email,
        gender,
        phone,
        dob,
        profileImage,
        emergencyContact,
        address,
        preferredCommunication,
        ridePreference,
        vehicle,
        vehicleImage,
        rcDocument,
        idProof,
        license,
      },
      { new: true }
    ).select("-password");

    console.log("updated user", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user profile", error: err.message });
  }
});

module.exports = router;
