
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const auth = require("./middleware/auth");
const socketAuth = require("./middleware/socketAuth");

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],

  },
  
});

// Set the socket.io instance in the app for easy access
app.set("io", io);

// Apply socket middleware
io.use(socketAuth);  // Socket authentication middleware

// Socket connection handling
io.on("connection", (socket) => {
  console.log(`Authenticated: ${socket.user.name} (${socket.user._id})`);

  socket.on("join_ride_chat", ( {rideId, userId}) => {
    socket.join(`ride_${rideId}`);
    console.log("ride id", rideId)
    console.log(`User ${socket.user.name} joined ride_${rideId}`);
  });

  socket.on("leave_ride_chat", (rideId) => {
    socket.leave(`ride_${rideId}`);
    console.log(`User ${socket.user.name} left ride_${rideId}`);
  });

  socket.on("send_message", ({ rideId, message }) => {
    io.to(`ride_${rideId}`).emit("new_message", message);
    console.log(`Message sent to ride_${rideId}: ${message}`);
  });

  socket.on("typing", ({ userId, rideId }) => {
    socket.to(`ride_${rideId}`).emit("typing", { userId });
    console.log(`${userId} is typing in ride_${rideId}`);
  });

  socket.on("stop_typing", ({ name, rideId }) => {
    socket.to(`ride_${rideId}`).emit("stop_typing", { name });
    console.log(`${name} stopped typing in ride_${rideId}`);
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.user.name}`);
  });
});

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed from this origin"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const rideRoutes = require("./routes/rideRoutes");
const userRoutes = require("./routes/userRoutes");

// Apply routes
app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/users", userRoutes);

// Protected route example
app.get("/api/protected", auth, (req, res) => {
  res.json({ message: "This is a protected route" });
});

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dorycar";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));