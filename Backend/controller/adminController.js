const jwt = require("jsonwebtoken");
const Ride = require("../models/Ride");
const User = require("../models/User");
const Ticket = require("../models/Ticket");

exports.getRideStats = async (req, res) => {
  try {
    // Count total rides
    const totalRides = await Ride.countDocuments();

    // Count rides by status
    const rideStatuses = [
      "pending",
      "accepted",
      "started",
      "completed",
      "cancelled",
    ];
    const statusCounts = {};

    for (const status of rideStatuses) {
      statusCounts[status] = await Ride.countDocuments({ status });
    }

    // Optionally, count upcoming rides (future date)
    const upcomingRides = await Ride.countDocuments({
      date: { $gte: new Date() },
    });

    // Calculate total earnings from completed rides
    const earnings = await Ride.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);
    const totalEarnings = earnings[0]?.total || 0;

    res.json({
      totalRides,
      statusCounts,
      upcomingRides,
      totalEarnings,
    });
  } catch (error) {
    console.error("Error fetching ride stats:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch ride stats", error: error.message });
  }
}; 

exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (error) {
    console.error("Error fetching user stats:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch user stats", error: error.message });
  }
};

exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find()
      .populate("creator", "name email") // correct field instead of 'driver'
      .populate("acceptor", "name ")
      .populate("interestedUsers.user", "name ")
      .sort({ createdAt: -1 });

    res.json(rides);
  } catch (err) {
    console.error("Error fetching rides:", err); // log exact error
    res
      .status(500)
      .json({ message: "Failed to fetch rides", error: err.message });
  }
};

exports.getDrivers = async (req, res) => {
  try {
    const driverIds = await Ride.distinct("creator");
    const drivers = await User.find({ _id: { $in: driverIds } }).sort({
      createdAt: -1,
    });

    res.json(drivers);
  } catch (err) {
    console.error("Error fetching drivers:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch drivers", error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find().sort({ createdAt: -1 });

    // Count rides per user where they are passengers (acceptors)
    const ridesPerUser = await Ride.aggregate([
      { $match: { acceptor: { $ne: null } } },
      { $group: { _id: "$acceptor", rideCount: { $sum: 1 } } },
    ]);

    const rideMap = {};
    ridesPerUser.forEach((entry) => {
      rideMap[entry._id.toString()] = entry.rideCount;
    });

    const usersWithProfile = users.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      dob: user.dob,
      address: user.address,
      profileImage: user.profileImage,
      rides: rideMap[user._id.toString()] || 0,

      vehicle: {
        type: user.vehicle?.type || "",
        make: user.vehicle?.make || "",
        model: user.vehicle?.model || "",
        color: user.vehicle?.color || "",
        year: user.vehicle?.year || "",
        registration: user.vehicle?.registration || "",
        fuel: user.vehicle?.fuel || "",
      },
      vehicleImage: user.vehicleImage,
      rcDocument: user.rcDocument,
      license: user.license,
      idProof: user.idProof,
    }));

    res.json(usersWithProfile);
  } catch (err) {
    console.error("Error fetching users:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

// exports.getTickets = async (req, res) => {
//   try {
    

//     // Proceed to fetch tickets
//     const { status, fromDate, toDate } = req.query;
//     const filter = {};

//     if (status) {
//       filter.status = status;
//     }

//     if (fromDate || toDate) {
//       filter.createdAt = {};
//       if (fromDate) filter.createdAt.$gte = new Date(fromDate);
//       if (toDate) filter.createdAt.$lte = new Date(toDate);
//     }

//     const tickets = await Ticket.find(filter)
//       .populate("ride", "origin destination date status")
//       .populate("raisedBy", "name email")
//       .populate("againstUser", "name email")
//       .sort({ createdAt: -1 });

//     const formattedTickets = tickets.map((ticket) => ({
//       _id: ticket._id,
//       issue: ticket.issue,
//       status: ticket.status,
//       createdAt: ticket.createdAt,
//       updatedAt: ticket.updatedAt,
//       raisedBy: ticket.raisedBy,
//       againstUser: ticket.againstUser,
//       ride: ticket.ride,
//     }));

//     res.json(formattedTickets);
//   } catch (error) {
//     console.error("Error fetching tickets:", error.message);
//     res.status(500).json({
//       message: "Failed to fetch tickets",
//       error: error.message,
//     });
//   }
// };

exports.getTickets = async (req, res) => {
  try {
    const { status, fromDate, toDate } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    const tickets = await Ticket.find(filter)
      .populate("ride", "origin destination date status")
      .populate("raisedBy", "name email")
      .populate("againstUser", "name email")
      .sort({ createdAt: -1 });

    const formattedTickets = tickets.map((ticket) => ({
      _id: ticket._id,
      issue: ticket.issue,
      image: ticket.image, // ⬅️ Include image
      status: ticket.status,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
      raisedBy: ticket.raisedBy,
      againstUser: ticket.againstUser,
      ride: ticket.ride,
    }));

    res.json(formattedTickets);
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    res.status(500).json({
      message: "Failed to fetch tickets",
      error: error.message,
    });
  }
};

// exports.updateTicketStatus = async (req, res) => {
//   try {
//     const { ticketId } = req.params;
//     const { status } = req.body;
//     console.log("Request body:", req.body);
// console.log("Received status:", status);

//     const validStatuses = ["open", "pending", "in-progress", "resolved", "closed"];

//     if (!validStatuses.includes(status?.toLowerCase())) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     const ticket = await Ticket.findById(ticketId);
//     if (!ticket) {
//       return res.status(404).json({ message: "Ticket not found" });
//     }

//     ticket.status = status.toLowerCase();
//     if (status.toLowerCase() === "resolved") {
//       ticket.resolvedAt = new Date();
//     }

//     await ticket.save();

//     // Emit socket notification
//     req.app.get("io").to(ticket.raisedBy.toString()).emit("ticket-notification", {
//       message: `Your ticket regarding ride ${ticket.ride} has been marked as ${ticket.status}.`,
//       type: "ticket-status-update",
//     });

//     res.json({ message: `Ticket marked as ${ticket.status}`, ticket });
//   } catch (error) {
//     console.error("Error updating ticket:", error);
//     res.status(500).json({ message: "Error updating ticket status", error: error.message });
//   }
// };

exports.updateTicketStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    const validStatuses = ["open", "pending", "in-progress", "resolved", "closed"];
    if (!validStatuses.includes(status?.toLowerCase())) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = status.toLowerCase();
    if (status.toLowerCase() === "resolved") {
      ticket.resolvedAt = new Date();
    }

    await ticket.save();

    req.app.get("io").to(ticket.raisedBy.toString()).emit("ticket-notification", {
      message: `Your ticket regarding ride ${ticket.ride} has been marked as ${ticket.status}.`,
      type: "ticket-status-update",
    });

    res.json({
      message: `Ticket marked as ${ticket.status}`,
      ticket: {
        _id: ticket._id,
        issue: ticket.issue,
        image: ticket.image, // ⬅️ Include image
        status: ticket.status,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        resolvedAt: ticket.resolvedAt,
        ride: ticket.ride,
        raisedBy: ticket.raisedBy,
        againstUser: ticket.againstUser,
      }
    });
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ message: "Error updating ticket status", error: error.message });
  }
};

// exports.getTicketById = async (req, res) => {
//   try {
//     const { ticketId } = req.params;

//     const ticket = await Ticket.findById(ticketId)
//       .populate("ride", "origin destination date status")
//       .populate("raisedBy", "name email phone")
//       .populate("againstUser", "name email phone");

//     if (!ticket) {
//       return res.status(404).json({ message: "Ticket not found" });
//     }

//     res.json({
//       _id: ticket._id,
//       issue: ticket.issue,
//       status: ticket.status,
//       createdAt: ticket.createdAt,
//       updatedAt: ticket.updatedAt,
//       resolvedAt: ticket.resolvedAt,
//       raisedBy: ticket.raisedBy,
//       againstUser: ticket.againstUser,
//       ride: ticket.ride,
//     });
//   } catch (error) {
//     console.error("Error fetching ticket:", error.message);
//     res.status(500).json({ message: "Error fetching ticket", error: error.message });
//   }
// };

exports.getTicketById = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId)
      .populate("ride", "origin destination date status")
      .populate("raisedBy", "name email phone")
      .populate("againstUser", "name email phone");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({
      _id: ticket._id,
      issue: ticket.issue,
      image: ticket.image, // ⬅️ Include image
      status: ticket.status,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
      resolvedAt: ticket.resolvedAt,
      raisedBy: ticket.raisedBy,
      againstUser: ticket.againstUser,
      ride: ticket.ride,
    });
  } catch (error) {
    console.error("Error fetching ticket:", error.message);
    res.status(500).json({ message: "Error fetching ticket", error: error.message });
  }
};
