const express = require("express");
const router = express.Router();
const Ride = require("../models/Ride");
const auth = require("../middleware/auth");
const User = require("../models/User");

router.post("/create", auth, async (req, res) => {
  console.log("Received request data:", req.body, "User:", req.userId);

  try {
    const {
      origin,
      destination,
      date,
      seats,
      price,
      paymentMethods,
      ridePreference,
      preferredCommunication,
      upiId,
      qrImageUrl,
      departureTime,
      arrivalTime, // ✅ add these
    } = req.body;
    // Fetch user
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check required fields for vehicle
    const vehicle = user.vehicle || {};
    const missingFields = [];

    const requiredVehicleFields = [
      "type",
      "make",
      "model",
      "registration",
      // "seats",
      "fuel",
    ];

    console.log("required fields",user.vehicle)

    requiredVehicleFields.forEach((field) => {
      if (!vehicle[field]) {
        missingFields.push(`vehicle.${field}`);
      }
    });

    // Check other user required fields
    if (!user.phone) missingFields.push("phone");
    if (!user.gender) missingFields.push("gender");
    if (!user.emergencyContact) missingFields.push("emergencyContact");
    if (!user.address) missingFields.push("address");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Please complete your profile before creating a ride",
        missingFields,
      });
    }

    // Create and save the ride
    const ride = new Ride({
      creator: req.userId,
      origin,
      destination,
      date,
      seats,
      price,
      paymentMethods,
      ridePreference,
      preferredCommunication,
      upiId,
      qrImageUrl,
      departureTime, // ✅ include
      arrivalTime,   // ✅ include
    });

    await ride.save();

    req.app.get("io").emit("ride-updated", ride);
    res.status(201).json(ride);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating ride", error: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { origin, destination, date } = req.query;

    const filter = {};

    if (origin) {
      filter.origin = { $regex: new RegExp(origin, "i") };
    }

    if (destination) {
      filter.destination = { $regex: new RegExp(destination, "i") };
    }

    if (date) {
      // Convert local date string to midnight UTC
      const searchDate = new Date(date);
      const utcStart = new Date(
        Date.UTC(
          searchDate.getFullYear(),
          searchDate.getMonth(),
          searchDate.getDate()
        )
      );

      const utcEnd = new Date(
        Date.UTC(
          searchDate.getFullYear(),
          searchDate.getMonth(),
          searchDate.getDate() + 1
        )
      );

      filter.date = {
        $gte: utcStart,
        $lt: utcEnd,
      };
    }

    filter.status = {
      $in: ["waiting", "pending", "accepted", "started", "completed", "cancelled"],
    };

    const rides = await Ride.find(filter)
      // .populate('creator', 'name')
      .populate(
        "creator",
        "name profileImage phone gender emergencyContact address preferredCommunication ridePreference vehicle averageRating ratings"
      )

      .populate(
        "acceptor",
        "name profileImage phone gender emergencyContact address"
      )

      .populate(
        "interestedUsers.user",
        "name profileImage phone gender emergencyContact address"
      )
      .sort({ createdAt: -1 });
    // .lean();

    res.json(rides);
  } catch (error) {
    console.error("Error in /api/rides route:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching rides", error: error.message });
  }
});

router.post("/:rideId/interest", auth, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.creator.toString() === req.userId) {
      return res
        .status(400)
        .json({ message: "Cannot express interest in your own ride" });
    }

    const alreadyInterested = ride.interestedUsers.find(
      (interest) => interest.user.toString() === req.userId
    );

    if (alreadyInterested) {
      return res
        .status(400)
        .json({ message: "Already expressed interest in this ride" });
    }

    // for personal details of acceptor

    const user = await User.findById(req.userId);
    const missingFields = [];

    if (!user.name) missingFields.push("name");
    if (!user.email) missingFields.push("email");
    if (!user.phone) missingFields.push("phone");
    if (!user.gender) missingFields.push("gender");
    if (!user.emergencyContact) missingFields.push("emergency contact");

    // Use .trim() based validation for string fields
    if (!user.address || user.address.trim() === "") {
      missingFields.push("address");
    }

    // if (!user.idProof || user.idProof.trim() === "") {
    //   missingFields.push("ID proof");
    // }

    console.log("User field values before expressing interest:", {
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      emergencyContact: user.emergencyContact,
      address: user.address,
      idProof: user.idProof,
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Please complete your profile to book this ride.`,
        missingFields,
        redirectTo: "/profile",
      });
    }

    ride.interestedUsers.push({ 
      user: req.userId,
      status: "interested",
    });

    await ride.save();
    const updatedRide = await Ride.findById(ride._id)
      .populate("creator", "name profileImage phone gender emergencyContact address preferredCommunication ridePreference vehicle averageRating ratings")
      .populate("acceptor", "name profileImage phone gender emergencyContact address")
      .populate("interestedUsers.user", "name");

    req.app.get("io").emit("ride-updated", updatedRide);

    req.app
      .get("io")
      .to(ride.creator._id.toString())
      .emit("ride-notification", {
        message: ` Someone has shown interest in your ride from ${ride.origin} to ${ride.destination}.`,
      });
    res.json(ride);
  } catch (error) {
    res.status(500).json({
      message: "Error expressing interest",
      error: error.message,
    });
  }
});

// Accept a ride (for ride creator to accept an interested user)
// router.post("/:rideId/accept/:userId", auth, async (req, res) => {
//   try {
//     const ride = await Ride.findById(req.params.rideId);
//     if (!ride) return res.status(404).json({ message: "Ride not found" });

//     // 2. Check if seats are available
//   if (ride.seats <= 0) {
//     return res.status(400).send("No seats available");
//   }

//     if (ride.creator.toString() !== req.userId)
//       return res
//         .status(403)
//         .json({ message: "Only ride creator can accept users" });

//     const interest = ride.interestedUsers.find(
//       (i) => i.user.toString() === req.params.userId
//     );

//     if (!interest)
//       return res
//         .status(404)
//         .json({ message: "User has not expressed interest" });

//     if (interest.status === "accepted") {
//       return res.status(400).json({ message: "User already accepted" });
//     }
//     interest.status = "accepted";
//     ride.status = "accepted";
//     // ride.acceptor = null;
//     ride.acceptor = req.params.userId

//     await ride.save();

//     const updatedRide = await Ride.findById(ride._id)
//       .populate("creator", "name profileImage phone gender emergencyContact address preferredCommunication ridePreference vehicle averageRating ratings")
//       .populate("acceptor", " name profileImage phone gender emergencyContact address")
//       .populate("interestedUsers.user", "name");

//     req.app.get("io").emit("ride-updated", updatedRide);
//     // req.app.get("io").emit("ride-updated", ride);

//     req.app
//       .get("io")
//       .to(req.params.userId)
//       .emit("ride-notification", {
//         message: ` You’ve been accepted for the ride from ${ride.origin} to ${ride.destination}`,
//       });

//     res.json(updatedRide);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error accepting ride", error: error.message });
//   }
// });

router.post("/:rideId/accept/:userId", auth, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    // Check if the requester is the ride creator
    if (ride.creator.toString() !== req.userId)
      return res.status(403).json({ message: "Only ride creator can accept users" });

    // Check if seats are available
    if (ride.seats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    // Find the interested user to accept
    const interest = ride.interestedUsers.find(
      (i) => i.user.toString() === req.params.userId
    );

    if (!interest)
      return res.status(404).json({ message: "User has not expressed interest" });

    if (interest.status === "accepted") {
      return res.status(400).json({ message: "User already accepted" });
    }

    // Accept the user and decrement seats
    interest.status = "accepted";
    ride.seats = Math.max(ride.seats - 1, 0);

    // IMPORTANT: Do not set ride.status = "accepted" here
    // because the ride status is global for the whole ride, not per user.
    // Only update ride.acceptor if you want to track the last accepted user.
    ride.acceptor = req.params.userId;

    await ride.save();

    const updatedRide = await Ride.findById(ride._id)
      .populate(
        "creator",
        "name profileImage phone gender emergencyContact address preferredCommunication ridePreference vehicle averageRating ratings"
      )
      .populate("acceptor", "name profileImage phone gender emergencyContact address")
      .populate("interestedUsers.user", "name");

    req.app.get("io").emit("ride-updated", updatedRide);

    req.app
      .get("io")
      .to(req.params.userId)
      .emit("ride-notification", {
        message: `You’ve been accepted for the ride from ${ride.origin} to ${ride.destination}`,
      });

    res.json(updatedRide);
  } catch (error) {
    res.status(500).json({ message: "Error accepting ride", error: error.message });
  }
});



router.put("/:rideId/start", auth, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.creator.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Only ride creator can start the ride" });
    }

    const hasAcceptedUsers = ride.interestedUsers.some(
      (interest) => interest.status === "accepted"
    );

    if (!hasAcceptedUsers) {
      return res.status(400).json({
        message: "You must accept at least one user before starting the ride",
      });
    }

    // Mark ride as started
    ride.status = "started";
    ride.startedAt = new Date();

    // Reject all non-accepted users
    ride.interestedUsers = ride.interestedUsers.map((interest) => {
      if (interest.status === "accepted") {
        interest.status = "started";
      } else if (interest.status !== "accepted") {
        interest.status = "rejected";
        const rejectionMessage = ` Your request for the ride from ${ride.origin} to ${ride.destination} was not accepted.`;

        // Send rejection notification
        req.app
          .get("io")
          .to(interest.user.toString())
          .emit("ride-notification", {
            message: rejectionMessage,
            type: "rejected",
          });

        req.app
          .get("io")
          .to(interest.user.toString())
          .emit("ride-updated", ride);

        ride.notifications.push({
          user: interest.user,
          message: rejectionMessage,
        });
      }

      return interest;
    });

    await ride.save();
    req.app.get("io").emit("ride-updated", ride);

    const updatedRide = await Ride.findById(ride._id)
      .populate("creator", "name profileImage phone gender emergencyContact address preferredCommunication ridePreference vehicle averageRating ratings")
      .populate("acceptor", "name")
      .populate("interestedUsers.user", "name");

    req.app.get("io").emit("ride-updated", updatedRide);

    // Notify accepted users that ride has started
    ride.interestedUsers.forEach((interest) => {
      if (interest.status === "started") {
        req.app
          .get("io")
          .to(interest.user.toString())
          .emit("ride-notification", {
            message: ` Your ride from ${ride.origin} to ${ride.destination} has started.`,
          });
      }
    });

    res.json(updatedRide);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error starting ride", error: error.message });
  }
});

// router.post("/:rideId/chat", auth, async (req, res) => {
//   try {
//     const ride = await Ride.findById(req.params.rideId);
//     if (!ride) return res.status(404).json({ message: "Ride not found" });

//     const isCreator = ride.creator.toString() === req.userId;
//     const isAcceptor = ride.acceptor?.toString() === req.userId;
//     const isInterested = ride.interestedUsers.some(
//       (u) => u.user.toString() === req.userId
//     );

//     if (!isCreator && !isAcceptor && !isInterested) {
//       return res.status(403).json({
//         message:
//           "Only the ride creator, accepted rider, and interested users can chat",
//       });
//     }

//     if (ride.status === "cancelled") {
//       return res
//         .status(403)
//         .json({ message: "Chat is disabled for cancelled rides" });
//     }

//     const content =
//       typeof req.body.content === "string" ? req.body.content.trim() : "";
//     if (!content)
//       return res.status(400).json({ message: "Message content is required" });

//     const newMessage = {
//       sender: req.userId,
//       content,
//       timestamp: new Date(),
//       readBy: [{ user: req.userId }],
//     };

//     ride.messages.push(newMessage);
//     await ride.save();

//     const populatedRide = await Ride.findById(ride._id)
//       .populate("messages.sender", "name profileImage")
//       .populate("messages.readBy.user", "name");

//     const latestMessage =
//       populatedRide.messages[populatedRide.messages.length - 1];
//     console.log("emitting events");
//     req.app.get("io").emit("ride-updated", populatedRide);
    
//     req.app.get("io").to(`ride_${ride._id}`).emit("new_message", {
//       rideId: ride._id,
//       message: latestMessage,
//     });

//     res.json(latestMessage);
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res
//       .status(500)
//       .json({ message: "Error sending message", error: error.message });
//   }
// });

router.post("/:rideId/chat", auth, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    const isCreator = ride.creator.toString() === req.userId;
    const isAcceptor = ride.acceptor?.toString() === req.userId;
    const isInterested = ride.interestedUsers.some(
      (u) => u.user.toString() === req.userId
    );

    if (!isCreator && !isAcceptor && !isInterested) {
      return res.status(403).json({
        message:
          "Only the ride creator, accepted rider, and interested users can chat",
      });
    }

    if (ride.status === "cancelled") {
      return res
        .status(403)
        .json({ message: "Chat is disabled for cancelled rides" });
    }

    const content =
      typeof req.body.content === "string" ? req.body.content.trim() : "";
    if (!content)
      return res.status(400).json({ message: "Message content is required" });

    const newMessage = {
      sender: req.userId,
      content,
      timestamp: new Date(),
      readBy: [{ user: req.userId }],
    };

    ride.messages.push(newMessage);
    await ride.save();

    const populatedRide = await Ride.findById(ride._id)
      .populate("messages.sender", "name profileImage")
      .populate("messages.readBy.user", "name");

    const latestMessage =
      populatedRide.messages[populatedRide.messages.length - 1];

    const io = req.app.get("io");

    // Emit for ride chatroom
    io.to(`ride_${ride._id}`).emit("new_message", {
      rideId: ride._id,
      message: latestMessage,
    });

    // Notify all other participants except sender
    const allUserIds = new Set([
      ride.creator.toString(),
      ride.acceptor?.toString(),
      ...ride.interestedUsers.map((u) => u.user.toString()),
    ]);
    allUserIds.delete(req.userId); // remove sender

    allUserIds.forEach((userId) => {
      io.to(`user_${userId}`).emit("new-message", {
        senderId: req.userId,
        senderName: latestMessage.sender.name || "User",
        content: content,
        rideId: ride._id,
      });
    });

    res.json(latestMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res
      .status(500)
      .json({ message: "Error sending message", error: error.message });
  }
});

router.get("/:rideId/chat", auth, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId)
      .populate("messages.sender", "name profileImage")
      .populate("messages.readBy.user", "name");

    if (!ride) return res.status(404).json({ message: "Ride not found" });

    const isCreator = ride.creator.toString() === req.userId;
    const isAcceptor = ride.acceptor?.toString() === req.userId;
    const isInterested = ride.interestedUsers.some(
      (u) => u.user.toString() === req.userId
    );

    if (!isCreator && !isAcceptor && !isInterested) {
      return res.status(403).json({
        message:
          "Only ride creator, accepted rider, and interested users can view chat",
      });
    }

    if (ride.status !== "cancelled") {
      ride.messages.forEach((msg) => {
        if (!msg.readBy.some((r) => r.user.toString() === req.userId)) {
          msg.readBy.push({ user: req.userId });
        }
      });
      await ride.save();
    }

    res.json({ messages: ride.messages });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chat history", error: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { origin, destination, date } = req.query;

    const filter = {
      status: { $in: ["pending", "accepted", "started"] },
    };

    if (origin) {
      filter.origin = { $regex: new RegExp(origin, "i") };
    }

    if (destination) {
      filter.destination = { $regex: new RegExp(destination, "i") };
    }

    if (date) {
      const searchDate = new Date(date);
      const utcStart = new Date(
        Date.UTC(
          searchDate.getFullYear(),
          searchDate.getMonth(),
          searchDate.getDate()
        )
      );
      const utcEnd = new Date(
        Date.UTC(
          searchDate.getFullYear(),
          searchDate.getMonth(),
          searchDate.getDate() + 1
        )
      );
      filter.date = { $gte: utcStart, $lt: utcEnd };
    }

    const rides = await Ride.find(filter)
      .populate(
        "creator",
        "name profileImage phone gender emergencyContact address preferredCommunication ridePreference vehicle averageRating ratings"
      )
      .populate("acceptor", "name")
      .populate("interestedUsers.user", "name")
      .sort({ createdAt: -1 });

    res.json(rides);
  } catch (error) {
    console.error("Error in /api/rides/search:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching searched rides", error: error.message });
  }
});

// Get user's rides (created, accepted, and interested)
router.get("/my-rides", auth, async (req, res) => {
  try {
    const createdRides = await Ride.find({ creator: req.user.userId })
      .populate("creator", "name ratings")
      .populate("acceptor", "name")
      .populate("interestedUsers.user", "name");

    const acceptedRides = await Ride.find({
      acceptor: req.user.userId,
    }).populate("creator", "name");

    const interestedRides = await Ride.find({
      "interestedUsers.user": req.user.userId,
    }).populate("creator", "name");

    res.json({
      created: createdRides,
      accepted: acceptedRides,
      interested: interestedRides,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user rides", error: error.message });
  }
});

// Complete a ride
router.put("/:rideId/complete", auth, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.creator.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Only ride creator can complete the ride" });
    }

    if (ride.status !== "started") {
      return res
        .status(400)
        .json({ message: "Only started rides can be completed" });
    }

    ride.status = "completed";
    ride.completedAt = new Date();

    // Update status for all interested users
    ride.interestedUsers = ride.interestedUsers.map((interest) => {
      if (interest.status === "started" || interest.status === "accepted") {
        interest.status = "completed";
      }
      return interest;
    });

    await ride.save();

    const updatedRide = await Ride.findById(ride._id)
      .populate("creator", "name profileImage phone gender emergencyContact address preferredCommunication ridePreference vehicle averageRating ratings")
      .populate("acceptor", "name profileImage phone gender emergencyContact address")
      .populate("interestedUsers.user", "name profileImage phone gender emergencyContact address");

    req.app.get("io").emit("ride-updated", updatedRide);

    req.app
      .get("io")
      .to(updatedRide.creator._id.toString())
      .emit("ride-updated", updatedRide);

    ride.interestedUsers.forEach((i) => {
      if (i.status === "completed") {
        req.app
          .get("io")
          .to(i.user.toString())
          .emit("ride-notification", {
            message: ` Your ride from ${ride.origin} to ${ride.destination} has been completed.`,
            type: "completed",
          });
      }
    });

    res.json(updatedRide);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error completing ride", error: error.message });
  }
});

router.post("/:rideId/review", auth, async (req, res) => {
  try {
    const { rideId } = req.params;
    const { rating, comment, toUserId } = req.body;
    const fromUserId = req.userId;

    const user = await User.findById(toUserId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingReview = user.ratings.find(
      (r) => r.ride?.toString() === rideId && r.by?.toString() === fromUserId
    );

    if (existingReview) {
      // Update existing review
      existingReview.rating = rating;
      existingReview.comment = comment;
      existingReview.date = new Date();
    } else {
      // Add new review
      user.ratings.push({
        rating,
        comment,
        by: fromUserId,
        date: new Date(),
        ride: rideId,
      });
    }

    // Update averageRating
    const total = user.ratings.reduce((sum, r) => sum + r.rating, 0);
    user.averageRating = total / user.ratings.length;

    await user.save();

    res.json({
      message: existingReview ? "Review updated" : "Review submitted",
    });
  } catch (err) {
    console.error("Submit review error:", err);
    res.status(500).json({ message: "Failed to submit review" });
  }
});

// router.put("/:rideId/cancel", auth, async (req, res) => {
//   try {
//     const ride = await Ride.findById(req.params.rideId);
//     if (!ride) {
//       return res.status(404).json({ message: "Ride not found" });
//     }

//     const isCreator = ride.creator.toString() === req.userId;

//     const userInterest = ride.interestedUsers.find(
//       (u) => u.user.toString() === req.userId
//     );
//     const userStatus = userInterest?.status;

//     const isAcceptedRider =
//       userStatus === "interested" ||
//       userStatus === "accepted" ||
//       userStatus === "started";

//     if (!isCreator && !isAcceptedRider) {
//       return res.status(403).json({
//         message: "Only ride creator or accepted riders can cancel the ride",
//       });
//     }

//     // Prevent cancellation if ride has already started or completed
//     if (
//       ride.status === "started" ||
//       ride.status === "completed" ||
//       userStatus === "started" ||
//       userStatus === "completed"
//     ) {
//       return res.status(400).json({
//         message:
//           "This ride has already started or completed and cannot be cancelled",
//       });
//     }

//     if (ride.status === "cancelled") {
//       return res.status(400).json({
//         message: "This ride is already cancelled",
//       });
//     }

//     ride.status = "cancelled";
//     ride.cancelledAt = new Date();
//     ride.cancellationReason =
//       req.body.cancellationReason || "No reason provided";
//     const cancelledBy = isCreator ? "Creator" : "Rider";

//     // Update all interested users' status (except already rejected ones)
//     ride.interestedUsers = ride.interestedUsers.map((interest) => {
//       if (interest.status !== "rejected") {
//         interest.status = "cancelled";
//       }
//       return interest;
//     });

//     await ride.save();

//     const updatedRide = await Ride.findById(ride._id)
//       .populate("creator", "name")
//       .populate("interestedUsers.user", "name");

//     // Send notification to creator if cancelled by rider
//     if (!isCreator) {
//       req.app
//         .get("io")
//         .to(ride.creator.toString())
//         .emit("ride-notification", {
//           message: `A rider has cancelled their participation in your ride from ${ride.origin} to ${ride.destination}. Reason: ${ride.cancellationReason}`,
//           type: "cancelled",
//         });
//     }

//     // Notify all other participants
//     updatedRide.interestedUsers.forEach((interest) => {
//       if (interest.user._id.toString() !== req.userId) {
//         req.app
//           .get("io")
//           .to(interest.user._id.toString())
//           .emit("ride-notification", {
//             message: `Ride from ${ride.origin} to ${ride.destination} was cancelled by ${cancelledBy}. Reason: ${ride.cancellationReason}`,
//             type: "cancelled",
//           });
//       }
//     });

//     // Emit ride update globally
//     req.app.get("io").emit("ride-updated", updatedRide);

//     res.json(updatedRide);
//   } catch (error) {
//     console.error("Error cancelling ride:", error);
//     res.status(500).json({
//       message: "Error cancelling ride",
//       error: error.message,
//     });
//   }
// });

router.put("/:rideId/cancel", auth, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    const isCreator = ride.creator.toString() === req.userId;

    const userInterest = ride.interestedUsers.find(
      (u) => u.user.toString() === req.userId
    );

    if (!userInterest && !isCreator) {
      return res.status(403).json({
        message: "You are not part of this ride to cancel",
      });
    }

    // Prevent cancellation if ride has started or completed
    if (
      ride.status === "started" ||
      ride.status === "completed" ||
      userInterest?.status === "started" ||
      userInterest?.status === "completed"
    ) {
      return res.status(400).json({
        message: "Ride has started or completed and cannot be cancelled",
      });
    }

    if (ride.status === "cancelled") {
      return res.status(400).json({
        message: "This ride is already cancelled",
      });
    }

    if (isCreator) {
      // If creator cancels ride, cancel entire ride
      ride.status = "cancelled";
      ride.cancelledAt = new Date();
      ride.cancellationReason = req.body.cancellationReason || "No reason provided";

      // Set all interested users status to cancelled except rejected
      ride.interestedUsers = ride.interestedUsers.map((interest) => {
        if (interest.status !== "rejected") {
          interest.status = "cancelled";
        }
        return interest;
      });
    } else {
      // Individual user cancellation
      // Only update if user is accepted or interested
      if (userInterest.status === "accepted" || userInterest.status === "interested") {
        // Increment seats only if previously accepted
        if (userInterest.status === "accepted") {
          ride.seats = Math.min(ride.seats + 1, ride.totalSeats || 10);
        }
        userInterest.status = "cancelled"; 
        userInterest.cancellationReason = req.body.cancellationReason || "No reason provided";
      } else {
        return res.status(400).json({ message: "You cannot cancel this ride" });
      }
    }

    await ride.save();

    const updatedRide = await Ride.findById(ride._id)
      .populate("creator", "name")
      .populate("acceptor", "name")
      .populate("interestedUsers.user", "name");

    // Determine if there are any accepted or started users to decide on notifications
    const hasAcceptedOrStartedUsers = ride.interestedUsers.some(
      (i) => ["accepted", "started"].includes(i.status)
    );

    if (hasAcceptedOrStartedUsers) {
      // Send notification to creator if cancelled by rider
      if (!isCreator) {
        req.app
          .get("io")
          .to(ride.creator.toString())
          .emit("ride-notification", {
            message: `A rider has cancelled their participation in your ride from ${ride.origin} to ${ride.destination}. Reason: ${ride.cancellationReason}`,
            type: "cancelled",
          });
      }

      // Notify all other participants except the cancelling user
      updatedRide.interestedUsers.forEach((interest) => {
        if (interest.user._id.toString() !== req.userId) {
          req.app
            .get("io")
            .to(interest.user._id.toString())
            .emit("ride-notification", {
              message: `Ride from ${ride.origin} to ${ride.destination} was cancelled by ${isCreator ? "Creator" : "Rider"}. Reason: ${ride.cancellationReason}`,
              type: "cancelled",
            });
        }
      });
    }

    // Emit ride update globally
    req.app.get("io").emit("ride-updated", updatedRide);

    res.json(updatedRide);
  } catch (error) {
    console.error("Error cancelling ride:", error);
    res.status(500).json({
      message: "Error cancelling ride",
      error: error.message,
    });
  }
});


module.exports = router;
