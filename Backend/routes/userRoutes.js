const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

router.get("/presigned-url", auth, async (req, res) => {
  const { fileType, extension = "jpeg", contentType = "image/jpeg" } = req.query;

  const key = `${fileType}/${uuidv4()}.${extension}`;

  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Expires: 60, // valid for 1 min
    ContentType: contentType,
    
  };

  try {
    const url = await s3.getSignedUrlPromise("putObject", params);
    res.json({
      url,
      key,
      publicUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate presigned URL", error: err.message });
  }
});


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

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password");  // Exclude password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
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
      previousProfileImageKey, // NEW: previous file key
      emergencyContact,
      address,
      preferredCommunication,
      ridePreference,
      vehicle,
      vehicleImage,
      previousVehicleImageKey, // NEW: previous file key
      rcDocument,
      previousRcDocumentKey,
      idProof,
      previousIdProofKey,
      license,
      previousLicenseKey,
    } = req.body;

    // ✅ Delete previous files if keys are provided
    const keysToDelete = [
      previousProfileImageKey,
      previousVehicleImageKey,
      previousRcDocumentKey,
      previousIdProofKey,
      previousLicenseKey,
    ].filter(Boolean); // removes undefined/null

    for (const key of keysToDelete) {
      await s3
        .deleteObject({
          Bucket: process.env.AWS_BUCKET,
          Key: key,
        })
        .promise();
    }

    // 🔄 Continue with user update as before
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
